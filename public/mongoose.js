// user name click loading
document.querySelectorAll("#user-list tr").forEach((el) => {
  el.addEventListener("click", function () {
    const id = el.querySelector("td").textContent;
    getComment(id);
  });
});

// user loading
async function getUser() {
  try {
    const res = await axios.get("/users");
    const users = res.data;
    console.log(users);
    const tbody = document.querySelector("#user-list tbody");
    tbody.innerHTML = "";
    users.map(function (user) {
      const row = document.createElement("tr");
      row.addEventListener("click", () => {
        getComment(user._id);
      });
      // row sell add
      let td = document.createElement("td");
      td.textContent = user._id;
      row.appendChild(td);
      td = document.createElement("td");
      td.textContent = user.name;
      row.appendChild(td);
      td = document.createElement("td");
      td.textContent = user.age;
      row.appendChild(td);
      td = document.createElement("td");
      td.textContent = user.married ? "기혼" : "미혼";
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

// comments loading
async function getComment(id) {
  try {
    const res = await axios.get(`./users/${id}/comments`);
    const comments = res.data;
    const tbody = document.querySelector("#comment-list tbody");
    tbody.innerHTML = "";
    comments.map(function (comment) {
      // row sell add
      const row = document.createElement("tr");
      let td = document.createElement("td");
      td.textContent = comment.commenter.name;
      row.appendChild(td);
      td = document.createElement("td");
      td.textContent = user.comment;
      row.appendChild(td);
      const edit = document.createElement("button");
      edit.textContent = "Edit";
      edit.addEventListener("click", async () => {
        // edit click event
        const newComment = prompt("change new comment");
        if (!newComment) {
          return alert("must write commnet!");
        }
        try {
          await axios.patch(`/comments/${comment._id}`, {
            comment: newComment,
          });
          getComment(id);
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "Delete";
      remove.addEventListener("click", async () => {
        // remove click event
        try {
          await axios.delete(`/comments/${comment._id}`);
          getComment(id);
        } catch (err) {
          console.error(err);
        }
      });
      td = document.createElement("td");
      td.appendChild(edit);
      row.appendChild(td);
      td = document.createElement("td");
      td.appendChild(remove);
      row.appendChild(td);
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

// user regist
document.getElementById("user-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  const age = e.target.age.value;
  const married = e.target.married.checked;
  if (!name) {
    return alert("input name!");
  }
  if (!age) {
    return alert("input age!");
  }
  try {
    await axios.post("/users", { name, age, married });
    getUser();
  } catch (err) {
    console.error(err);
  }
  e.target.username.value = "";
  e.target.age.value = "";
  e.target.married.checked = false;
});

// comment regist
document
  .getElementById("comment-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;
    if (!id) {
      return alert("input id!");
    }
    if (!comment) {
      return alert("input comment!");
    }
    try {
      await axios.post("/comments", { id, comment });
      getComment(id);
    } catch (err) {
      console.error(err);
    }
    e.target.userid.value = "";
    e.target.comment.value = "";
  });
