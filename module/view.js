const view = (function () {
  //Get DOM
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
    deleteItem: ".deleteItem",
  };
  return {
    getDOMStrings: function () {
      return DOMstrings;
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    renderItems: function () {
      let list = localStorage.getItem("budgetData");
      list = JSON.parse(list);

      let listInc = list.allItems.inc;
      let listExp = list.allItems.exp;

      let renderInc = "";
      let renderExp = "";

      let itemInc;
      let itemExp;

      let type;


      itemInc = DOMstrings.incomeContainer;
      itemExp = DOMstrings.expensesContainer;

      document.querySelector(itemInc).innerHTML = "";
      document.querySelector(itemExp).innerHTML = "";

      listInc.forEach((element) => {
        type = "inc";

        renderInc += `<div class="item" id="inc-${element.id}">
                      <div class="item__description">${element.description}</div>
                      <div class="right">
                          <div class="item__value">&euro;${element.value}</div>
                          <div class="item__delete">
                              <button class="item__delete--btn">
                                  <i class="ion-ios-close-outline deleteItem${type}" data-id="${element.id}" data-type="${type}"></i>
                              </button>
                          </div>
                      </div>
                    </div>`;
      });

      listExp.forEach((element) => {
        type = "exp";

        renderExp += `<div class="item" id="exp-${element.id}">
                      <div class="item__description">${element.description}</div>
                      <div class="right">
                          <div class="item__value">&euro;${element.value}</div>
                          <div class="item__percentage">${element.percentage}%</div>
                          <div class="item__delete">
                              <button class="item__delete--btn">
                                  <i class="ion-ios-close-outline deleteItem${type}" data-id="${element.id}" data-type="${type}"></i>
                              </button>
                          </div>
                      </div>
                    </div>`;
      });
      document
        .querySelector(itemExp)
        .insertAdjacentHTML("beforeend", renderExp);

      document
        .querySelector(itemInc)
        .insertAdjacentHTML("beforeend", renderInc);
    },

    addToFront: function (data) {
      document.querySelector(DOMstrings.budgetLabel).textContent =
        "€" + data.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        "€" + data.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        "€" + data.totalExp;
      if (data.percentage > 0) {
        console.log(data.percentage);
        document.querySelector(DOMstrings.percentageLabel).textContent =
          data.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "...";
      }
    },
    clearFields: function () {
      document.querySelector(DOMstrings.inputDescription).value = "";
      document.querySelector(DOMstrings.inputValue).value = "";
      document.querySelector(DOMstrings.inputType).value = "inc";
    },

    deleteItem: function (id, type) {
      const element = document.getElementById(`${type}-${id}`);
      element.parentElement.removeChild(element);
    },

    displayPercentages: function (allPerc) {
      let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      fields.forEach((elem, index) => {
        elem.textContent = allPerc[index] + "%";
      });
    },
  };
})();
export default view;
