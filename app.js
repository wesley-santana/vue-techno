vm = new Vue({
  el: "#app",
  data: {
    message: "Bem vindo!",
    products: [],
  },
  methods: {
    getProducts() {
      fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((json) => {
          this.products = json;
        });
    },
  },
  created() {
    this.getProducts();
  },
});
