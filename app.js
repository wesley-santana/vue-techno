vm = new Vue({
  el: "#app",
  data: {
    message: "Bem vindo!",
    products: [],
    productDetail: false,
    quantityInItemsInCart: 0,
    listProductInCart: [],
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

    openModal (id) {
      this.getProductById(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },

    closeMoldal({target, currentTarget}) {
      if (target === currentTarget){ this.productDetail = false }
    },

    addToCart() {
    }
  },

  filters: {
    formatCurrency(currency) {
      return currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
  },

  created() {
    this.getProducts();
  },
});
