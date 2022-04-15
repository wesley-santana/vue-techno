vm = new Vue({
  el: "#app",
  data: {
    products: [],
    productDetail: false,
    amount: 0,
    listProductInCart: [],
    alertMessage: "",
    alertActive: false,
    cartActive: false,
  },

  computed: {
    total() {
      if (this.listProductInCart.length > 0) {
        return this.listProductInCart.reduce(function (total, currentItem) {
          return total + currentItem.price;
        }, 0);
      }
      return 0;
    },
  },
  methods: {
    getProducts() {
      fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((json) => {
          this.products = json;
        });
    },

    getProductById(id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then((response) => response.json())
        .then((json) => {
          this.productDetail = json;
        });
    },
    compareStock() {
      const items = this.listProductInCart.filter((item) => {
        if (item.id === this.productDetail.id) {
          return true;
        }
      });
      this.productDetail.inventory =
        this.productDetail.inventory - items.length;
    },
    showAlert(message) {
      this.alertMessage = message;
      this.alertActive = true;
      setTimeout(() => {
        this.alertActive = false;
      }, 1500);
    },
    openModal(id) {
      this.getProductById(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    closeMoldal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.productDetail = false;
      }
    },

    addToCart() {
      this.productDetail.inventory--;
      const { id, name, price } = this.productDetail;
      this.listProductInCart.push({ id, name, price });
      this.showAlert("Produdo adiciona ao carrinho");
    },

    removeFromCart(index) {
      this.listProductInCart.splice(index, 1);
    },

    checkCart() {
      if (window.localStorage.userCart) {
        this.listProductInCart = JSON.parse(window.localStorage.userCart);
      }
    },

    route() {
      const hash = document.location.hash;
      if (hash) {
        this.getProductById(hash.replace("#", ""));
      }
    },

    skipMoldaCart({ target, currentTarget }) {
      if (target === currentTarget) {
        this.cartActive = false;
      }
    },
  },

  filters: {
    formatCurrency(currency) {
      return currency.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
  },

  watch: {
    listProductInCart() {
      window.localStorage.userCart = JSON.stringify(this.listProductInCart);
    },

    productDetail() {
      const productIdURL = this.productDetail.id || "";
      document.title = this.productDetail.name || "Techno";
      history.pushState(null, null, `#${productIdURL}`);
      if (this.productDetail) {
        this.compareStock();
      }
    },
  },

  created() {
    this.getProducts();
    this.checkCart();
    this.route();
  },
});
