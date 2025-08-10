document.addEventListener("DOMContentLoaded", function() {
    const navbarHTML = `
        <div class="navbar-container">
            <div class="nav-logo">
                <a href="index.html"><img src="static/sp_logo.png" alt="Logo"></a>
            </div>
            <div class="nav-links">
                <a href="about.html">ABOUT</a>
                <a href="jhkum78.html">JHKUM78</a>
                <a href="yulucida.html">YULUCIDA</a>
            </div>
        </div>
    `;
    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
        placeholder.innerHTML = navbarHTML;
    }
});
