async function createMemo(value) {
  const memo = await fetch("/memo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime().toString(),
      content: value,
    }),
  });
  const memoJson = await memo.json();
  console.log(memoJson);
}

function handleMemo(event) {
  event.preventDefault();
  const input = document.querySelector("#input_memo");
  if (input.value.trim() !== "") {
    createMemo(input.value);
    input.value = "";
  }
}

function submitMemo() {
  const memoButton = document.querySelector("#memoButton");
  const input = document.querySelector("#input_memo");
  const form = document.querySelector("#form_memo");

  form.addEventListener("submit", handleMemo);
  memoButton.addEventListener("click", handleMemo);

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleMemo(event);
    }
  });
}

async function getMemos(sortOrder = "ASC") {
  try {
    const response = await fetch(`/memo?sort=${sortOrder}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const memos = await response.json();
    displayMemos(memos); // 이 함수는 메모를 화면에 표시하는 역할을 합니다
  } catch (error) {
    console.error("Error fetching memos:", error);
  }
}

document.addEventListener("DOMContentLoaded", submitMemo);
