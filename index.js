let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const clearBtn.document.getElementById("clear-btn")
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

deleteBtn.addEventListener("dblclick", function () {
    // Check if myLeads is not empty
    if (myLeads && myLeads.length > 0) {
        // Remove the first element (most recent data)
        myLeads.splice(0, 1)

        // Save the updated array back to local storage
        localStorage.setItem('myLeads', JSON.stringify(myLeads))

        // Render the updated data
        render(myLeads)
    }
});

clearBtn.addEventListener("dblclick", function(){
    const inputValue = inputEl.value
    const index = myLeads.indexOf(inputValue)
    if (index !== -1) {
        myLeads.splice(index, 1)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    }
})
                          
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})
