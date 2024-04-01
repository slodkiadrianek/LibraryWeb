const quotesTable = document.querySelector('.quotes__table')
const user = JSON.parse(sessionStorage.getItem("user"));
let listOfQuotes

class App{

    constructor(){
         listOfQuotes =  this.createQuotes() 
        document.querySelector('body').addEventListener('click', this.addtoAccount)
       
    }
    async createQuotes(){
        try {
            let x = 0
            const listOfQuotes = []
            while(x< 21){
                x++
                const response = await fetch("https://api.quotable.io/random");
                const consumeData = await response.json();
                listOfQuotes.push(consumeData)
            }
             qui = await listOfQuotes
             await qui.map(el => {
                let html = `
                <article class="quote__box">
            <h3 class="quote__place">${el.content}</h3>
            <p class="author__place">${el.author}</p>
            <div class="action"> 
        <button class="book__button_like"><img class="book__img" src="images/heart-svgrepo-com.svg" alt=""></button> 
        </div>
        </article>
                `
                quotesTable.insertAdjacentHTML('afterbegin', html)
             })
             
        } catch (error) {
            console.log(`Problem z załadowaniem cytatów, Sprawdź połaczenie z siecią`);
            const html = `<p class ="error__queote">⚠ Problem z załadowanie cytatów. Sprawdź połączenie z siecią</p>`
            quotesTable.insertAdjacentHTML('afterbegin', html)
            quotesTable.style.display = 'flex'
            quotesTable.style.justifyContent = 'center'
        }
    }
    addtoAccount(e){
        if(  e.target.classList.contains('book__button_like') || e.target.classList.contains('book__img')){
         const parent = e.target.closest(".action");
         const higherParent = parent.closest(".quote__box")
         const likedObject = higherParent.children[0].textContent;
        user.likedQuotes.push(likedObject)
        sessionStorage.setItem("user", JSON.stringify(user));
        }
    }
}



const newApp = new App()  