"use strict";

function fillTestData() {
  const keys = ["date", "number", "string"];
  const data = [];
  let getRand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  let randDate = () =>
    new Date(Math.floor(now + Math.random() * (end_date - now))).toISOString();
  let getRandString = function () {
    let ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let j = 0; j < 10; j++) {
      result += ch.charAt(Math.floor(Math.random() * ch.length));
    }
    return result;
  };
  let now = Date.now();
  let end_date = now + 86400000 * 365 * 2;
  for (let i = 0; i < 10; i++) {
    data.push([randDate(), getRand(1111, 99999), getRandString()]);
  }
  return {
    keys: keys,
    data: data,
  };
}

const tableData = fillTestData();
// .....................

const table = document.querySelector("#table");
const tHead = document.createElement("thead");

function createTableHead() {
  const tr = document.createElement("tr");

  for (let i = 0; i < tableData.keys.length; i++) {
    let th = document.createElement("th");
    th.textContent =
      tableData.keys[i].charAt(0).toUpperCase() + tableData.keys[i].slice(1);
    th.classList.add(`${tableData.keys[i]}`);

    tr.append(th);
  }
  table.append(tHead);
  tHead.append(tr);
}

function createTableBody() {
  const tBody = document.createElement("tbody");

  for (let i = 0; i < tableData.data.length; i++) {
    let tr = document.createElement("tr");

    for (let j = 0; j < tableData.data[i].length; j++) {
      // let td = document.createElement("td");
      // td.textContent = tableData.data[i][j];
      // tr.append(td);
      tr.innerHTML += `<td>${tableData.data[i][j]}</td>`;
    }
    tBody.append(tr);
  }
  table.append(tBody);
}

function sortTable({ target }) {
  const body = document.querySelector("tbody");
  const order = tHead.querySelectorAll("th");

  if (!target.dataset.order) {
    order.forEach((el) => el.removeAttribute("data-order"));
    target.dataset.order = 1;
  } else if (target.dataset.order == 1) {
    target.dataset.order = -1;
  } else if (target.dataset.order == -1) {
    target.dataset.order = 1;
  }

  body.remove();

  switch (target.classList[0]) {
    case "date":
      tableData.data.sort((a, b) => {
        dateA = new Date(a[0]);
        dateB = new Date(b[0]);
        return target.dataset.order == -1 ? dateB - dateA : dateA - dateB;
      });
      break;

    case "number":
      tableData.data.sort((a, b) =>
        target.dataset.order == -1 ? b[1] - a[1] : a[1] - b[1]
      );
      break;

    case "string":
      tableData.data.sort((a, b) => {
        const nameA = a[2].toLowerCase(),
          nameB = b[2].toLowerCase();
        if (target.dataset.order == -1) {
          if (nameB < nameA) return -1;
        } else {
          if (nameB > nameA) return -1;
        }
      });
      break;
  }

  createTableBody();
}

createTableHead();
createTableBody();
tHead.addEventListener("click", sortTable);
