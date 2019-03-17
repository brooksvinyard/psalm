class Menu {
    constructor(element) {
        
      this.element = element;
      this.button = this.element.querySelector('.menu-button');
      this.content = this.element.querySelector('.menu-content');
      this.close = this.element.querySelector('.close-btn');
      this.button.addEventListener('click', () => { this.toggleContent() });
      this.close.addEventListener('click', () => { this.toggleContent() });
      
      this.esv = this.element.querySelector('.choose-esv');
      this.kjv = this.element.querySelector('.choose-kjv');
      this.esv.addEventListener('click', () => { this.selectESV() });
      this.kjv.addEventListener('click', () => { this.selectKJV() });
    }
  
    toggleContent() {
        this.menuOn()
        // The page starts with the ".menu-hidden" class on, so it is off the page
        this.content.classList.remove('menu-hidden');
        
        // Toggle the menu on click
        this.content.classList.toggle('slide-in-right');
        this.content.classList.toggle('slide-out-right');
    }

    menuOn() {
        //Fade the rest of the page when menu is on
        document.querySelector('.container').classList.toggle('menu-on')
    }
    selectESV() {
        document.querySelector('#esv').classList.remove('translation-off')
        document.querySelector('#kjv').classList.add('translation-off')
    }
    selectKJV() {
        document.querySelector('#esv').classList.add('translation-off')
        document.querySelector('#kjv').classList.remove('translation-off')
    }
}

let menuClick = document.querySelectorAll('.menu').forEach( menu => new Menu(menu));

//rotate font awesome gear on rotate
// let menuHover = document.querySelectorAll('.menu-content ul li').forEach( hover => new Spin(hover));