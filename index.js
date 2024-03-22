let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", 

    // Step 2: Remove the specific item from the array
    function removeItemFromArray(itemToRemove, array) {
        const index = array.indexOf(itemToRemove)
        if (index > -1) {
            array.splice(index, 1)
        }
    }
    
    // Example: Removing 'itemToRemove' from 'leadsFromLocalStorage'
    let itemToRemove = '[0]'
    removeItemFromArray(itemToRemove, leadsFromLocalStorage)
    
    // Step 3: Store the updated array back into local storage
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    
    // Step 4: Display the remaining items in the array
    // Example: Displaying remaining items in the console
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
