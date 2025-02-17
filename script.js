document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".product");

    function revealProducts() {
        products.forEach((product) => {
            const rect = product.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                product.style.opacity = "1";
                product.style.transform = "translateY(0)";
            } else {
                product.style.opacity = "0";
                product.style.transform = "translateY(50px)";
            }
        });
    }

    window.addEventListener("scroll", revealProducts);
    revealProducts(); // Uruchom na start
});

function openCheckout(buttonId) {
    // Resetujemy checkout
    document.getElementById("paypal-container").innerHTML = "";
    
    // Pokazujemy checkout
    const checkout = document.getElementById("paypal-checkout");
    checkout.classList.add("show");

    // Dodajemy skrypt PayPal
    const paypalScript = document.createElement("script");
    paypalScript.src = "https://www.paypal.com/sdk/js?client-id=BAAIimVQQCgMwrsh6INBnDToJ7ih674YlVDemj01sQKNFJeFmSKpA2jrKecXEW32SMRQAmf8gMr9VBrb-g&components=hosted-buttons&disable-funding=venmo&currency=PLN";
    paypalScript.onload = function () {
        paypal.HostedButtons({ hostedButtonId: buttonId }).render("#paypal-container");
    };

    document.body.appendChild(paypalScript);
}

function closeCheckout() {
    const checkout = document.getElementById("paypal-checkout");
    checkout.classList.remove("show");
    setTimeout(() => {
        checkout.style.display = "none";
        document.getElementById("paypal-container").innerHTML = ""; // Czyści PayPal
    }, 300);
}


