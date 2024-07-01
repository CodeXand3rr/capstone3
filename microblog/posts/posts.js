// Post page Jahir 

"use strict";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphaGlyIiwiaWF0IjoxNzE5NTk0MDcyLCJleHAiOjE3MTk2ODA0NzJ9.jdBJ8gDBc-OYp13gNnDDKcEd4u2gQy7DTGtPmoIn-bM";

document.addEventListener("DOMContentLoaded", function () {
  const postsContainer = document.getElementById("postsContainer");
  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", function () {
    logout();
  });

  fetch(`${apiBaseURL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((posts) => {
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">${post.username}</h5>
              <p class="card-text">${post.text}</p>
              <p class="card-text"><small class="text-muted">${new Date(
                post.createdAt
              ).toLocaleString()}</small></p>
            </div>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
});