vm = new Vue({
  el: "#app",
  data: {
    message: "Bem vindo!",
    products: [],
  },
  methods: {
    getProducts() {
      fetch("../api/products.json")
        .then((response) => response.json())
        .then((json) => {
          this.products = json;
        });
      console.log("tyeste");
    },
  },
  created() {
    this.getProducts();
  },
});
