var controler = function (model, view) {
  view.renderItems();

  let setupListeners = function () {
    let DOM = view.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (e) {
      if (e.key == "Enter") {
        ctrlAddItem();
      }
    });
  };

  let setupListener = function (id, type) {
    let deleteInc = document.querySelectorAll(`.deleteIteminc`);
    deleteInc.forEach((element) => {
      element.addEventListener("click", ctrlDeleteItem);
    });

    let deleteExp = document.querySelectorAll(`.deleteItemexp`);
    deleteExp.forEach((element) => {
      element.addEventListener("click", ctrlDeleteItem);
    });
  };

  let ctrlAddItem = function () {
    let input = view.getInput();
    if (!isNaN(input.value) && input.value !== "") {
      let newItem = model.addItem(input.type, input.description, input.value);
      updateBudget();
      view.clearFields();
      updatePercentages();
      model.setData();
      view.renderItems();
      setupListener(newItem.id, input.type);
    } else {
      alert("Please enter a valid number for the value.");
    }
  };

  let ctrlDeleteItem = function () {
    let id = this.dataset.id;
    let type = this.dataset.type;
    model.deleteItem(id, type);
    view.deleteItem(id, type);
    updateBudget();
    updatePercentages();
    model.setData();
  };

  let updateBudget = function () {
    model.calculateBudget();
    let budget = model.getBudget();
    view.addToFront(budget);
  };

  let updatePercentages = function () {
    model.calculatePercentages();
    let percentages = model.getPercentages();
    view.displayPercentages(percentages);
  };
  return {
    init: function () {
      view.addToFront({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupListeners();
      updateBudget();
      setupListener();
    },
  };
};

export default controler;
