document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api-berita-indonesia.vercel.app/antara/politik/",
    true
  );

  xhr.onload = function () {
    if (this.status === 200) {
      var data = JSON.parse(this.responseText);
      if (data.success) {
        // Insert header content
        const headerHtml = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
            <a class="navbar-brand" href="${data.data.link}">
                <img src="${data.data.image}" alt="${data.data.title}" height="40" class="d-inline-block align-top">
            </a>
            <h5 class="mb-0 text-danger">${data.data.title}</h5>
            <span class="navbar-text">
                ${data.data.description}
            </span>
        </nav>
    `;

        document.getElementById("news-header").innerHTML = headerHtml;

        const newsContainer = document.getElementById("news-container");
        data.data.posts.forEach((post) => {
          // Truncate description to 150 characters
          let truncatedDescription =
            post.description.length > 150
              ? post.description.substring(0, 150) + "..."
              : post.description;

          const cardHtml = `
                    <div class="col-md-4 mb-3 d-flex">
                        <div class="card flex-fill">
                            <img src="${post.thumbnail}" class="card-img-top" alt="...">
                            <div class="card-body shadow d-flex flex-column">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text flex-grow-1 text-justify">${truncatedDescription}</p>
                                <a href="${post.link}" class="btn btn-danger mt-auto">Lihat Selengkapnya</a>
                            </div>
                        </div>
                    </div>
                `;

          newsContainer.innerHTML += cardHtml;
        });
      }
    } else {
      console.error("Error:", this.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request error...");
  };

  xhr.send();
});
