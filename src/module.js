      import loadData from "./Layers/data/dataLayer.js";
      const data = await loadData()
      export default data
      const btn = document.querySelector(".select__btn");
      const themeBtn = document.querySelector(".header__btn");
      const custom__select = document.querySelector(".custom__select");
      btn.addEventListener("click", () => {
        custom__select.classList.toggle("hide");
      })
      let isDark = Boolean(document.body.getAttribute("data-theme"));
      themeBtn.addEventListener("click", () => {
        isDark = !isDark;
        let theme = isDark ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
      })

      const test = document.getElementById("test");
      for(let y of data ){
        test.insertAdjacentHTML("beforeend",`<p style="font-size: 1.3rem;">${y.name}</p><br/>`)
      }