async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');
    //add new button - to RESET counter
    const resetButton = document.createElement('button');
    resetButton.style.backgroundColor = 'red'
    resetButton.style.color = 'white'
    resetButton.textContent = 'Reset'
    document.getElementsByTagName('div')[2].appendChild(resetButton);

    const response = await fetch('http://localhost:9001/counter');

    const result = await response.json();

    let countValue = result.value;

    function increment(){
        countValue++;
        countContainer.textContent = countValue;
//each time increment function runs, server data is 'PATCHED'
        fetch('http://localhost:9001/counter', {

        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'value': countValue,
        })
    })
    }

    function decrement(){
        countValue--;
        countContainer.textContent = countValue;
//each time increment function runs, server data is 'PATCHED'
        fetch('http://localhost:9001/counter', {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'value': countValue,
            })
        })
        decrementValue = countValue;
    }
//reset function to 0, but does not preserve the page load value
    function resetNow() {

        countValue = 0;
        countContainer.textContent=countValue;
        fetch('http://localhost:9001/counter', {

            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'value': countValue,
            })
        })
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    //Reset function event listener
    resetButton.addEventListener('click', resetNow);
    countContainer.textContent = countValue;
}
main()

