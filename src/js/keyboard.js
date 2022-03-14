export class Keyboard {
  #swichEl;
  #fontSelectEl;
  #containerEl;
  #inputGroupEl;
  #inputEl;
  #keyboardEl;
  #keyPress = false;
  #mousePress = false;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    //TODO have to put # in order to get element by id using querySelector
    this.#swichEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#containerEl.querySelector("#input");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
  }

  #addEvent() {
    this.#swichEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    //TODO without bind(this) -> 'this' inside the functions will acknowledged as window. so binding will help this to be referred as upper class!
    this.#inputEl.addEventListener("input", this.#onInput.bind(this));
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseUp(event) {
    if (this.#keyPress) return;
    this.#mousePress = false;
    const keyEl = event.target.closest("div.key");
    //TODO !!-> make it boolean type (! makes undefined -> true / !! makes true-> false)
    const isActive = !!keyEl?.classList.contains("active");
    //TODO data-val -> can access by 'dataset.val'
    const val = keyEl?.dataset.val;
    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }
    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }
    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }

  #onMouseDown(event) {
    if (this.#keyPress) return;
    this.#mousePress = true;
    event.target.closest("div.key")?.classList.add("active");
  }
  #onKeyDown(event) {
    if (this.#mousePress) return;
    this.#keyPress = true;
    this.#containerEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");

    this.#inputGroupEl.classList.toggle(
      "error",
      //TODO how to check whether input is korean or not
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key)
    );
  }

  #onKeyUp(event) {
    if (this.#mousePress) return;
    this.#keyPress = false;
    //TODO ? => optional chaining
    this.#containerEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  #onInput(event) {
    event.target.value = event.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
