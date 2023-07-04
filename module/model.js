const model = (function () {

  //Set data(income and expense array)
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = parseInt(value);
  };

  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = parseInt(value);
    this.percentage = -1;
  };

//Save data in local storage
  let data;
  const localStorageData = localStorage.getItem("budgetData");
  if (localStorageData) {
    data = JSON.parse(localStorageData);
  } else {
    data = {
      allItems: {
        inc: [],
        exp: [],
      },
      totals: {
        exp: 0,
        inc: 0,
      },
      budget: 0,
      percentage: 0,
    };
  }
  localStorage.setItem("budgetData", JSON.stringify(data));

  //Calculate 
  const calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach((element) => {
      sum += element.value;
    });
    data.totals[type] = sum;
  };
  Expense.prototype.calculatePercentage = function (totalExp) {
    if (totalExp > 0) {
      this.percentage = Math.round((this.value / totalExp) * 100);
    } else {
      this.percentage = -1;
    }
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };
  return {
    setData: function () {
      localStorage.setItem("budgetData", JSON.stringify(data));
    },
    calculateBudget: function () {
      calculateTotal("exp");
      calculateTotal("inc");
      data.budget = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    addItem: function (type, desc, value) {
      let id, obj;
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 1;
      }

      if (type == "inc") {
        obj = new Income(id, desc, value);
      } else {
        obj = new Expense(id, desc, value);
      }
      data.allItems[type].push(obj);

      return obj;
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    deleteItem: function (id, type) {
      let ids = data.allItems[type].map(function (elem) {
        return elem.id;
      });
      let index = ids.indexOf(parseInt(id));
      if (index != -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculatePercentages: function () {
      data.allItems.exp = data.allItems.exp.map((elem) => {
        return new Expense(elem.id, elem.description, elem.value);
      });
      data.allItems.exp.forEach((elem) => {
        elem.calculatePercentage(data.totals.exp);
      });
    },
    getPercentages: function () {
      const allPerc = data.allItems.exp.map((elem) => {
        return elem.getPercentage();
      });

      return allPerc;
    },
  };
})();
export default model;
