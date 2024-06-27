"use strict"

window.onload = function () {
    document.addEventListener("DOMContentLoaded", function () {
      const profileForm = document.getElementById("profileForm");
      const fullNameInput = document.getElementById("fullName");
      const bioInput = document.getElementById("bio");
      const logoutButton = document.getElementById("logoutButton");
  
      logoutButton.addEventListener("click", function () {
        logout();
      });
  
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphaGlyIiwiaWF0IjoxNzE5NDU3NjQyLCJleHAiOjE3MTk1NDQwNDJ9.9DVrHB23Faynfjkgj0kWSoIIEqkGpRPPfq8aSXXwRY0";
      const username = getLoginData().username;
  
      // Load user profile
      fetch(`${apiBaseURL}/api/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          fullNameInput.value = user.fullName;
          bioInput.value = user.bio;
        })
        .catch((error) => console.error("Error fetching profile:", error));
  
      // Update user profile
      profileForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const updatedProfile = {
          fullName: fullNameInput.value,
          bio: bioInput.value,
        };
  
        fetch(`${apiBaseURL}/api/users/${username}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProfile),
        })
          .then((response) => response.json())
          .then((data) => {
            alert("Profile updated successfully!");
          })
          .catch((error) => console.error("Error updating profile:", error));
      });
    });
  
    function logout() {
      fetch(`${apiBaseURL}/auth/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
          window.location.assign("../index.html"); // redirect back to landing page
        })
        .catch((error) => console.error("Error logging out:", error));
    }
  };
  