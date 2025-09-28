const BASE_URL = "http://localhost:3000";

//------rendering posts
async function fetchPosts(filterUser = null) {
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    const posts = await res.json();

    // Determine which container exists
    const profileContainer = document.getElementById("profile-posts");
    const feedContainer = document.getElementById("feed");

    if (profileContainer) renderFeed("profile-posts", filterUser, posts);
    else if (feedContainer) renderFeed("feed", filterUser, posts);
  } catch (err) {
    console.error("Failed to fetch posts:", err);
  }
}

function renderFeed(containerId, filterUser, data) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  data
    .filter(post => !filterUser || post.user === filterUser)
    .forEach(post => {
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `
        <img src="${BASE_URL}${post.image}" alt="Post Image">
        <p><b>${post.user}:</b> ${post.caption}</p>
      `;
      container.appendChild(div);
    });
}


if (document.getElementById("feed")) fetchPosts();
else if (document.getElementById("profile-posts")) fetchPosts("Aryan");


//---new postings
const uploadForm = document.getElementById("uploadForm");

if (uploadForm) {
  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(uploadForm);

    try {
      const res = await fetch(`${BASE_URL}/posts`, {
        method: "POST",
        body: formData
      });

      await res.json();
      alert("Post uploaded successfully!");

      fetchPosts(document.getElementById("profile-posts") ? "Aryan" : null);

      uploadForm.reset();
    } catch (err) {
      console.error(err);
      alert("Failed to upload post.");
    }
  });
}

