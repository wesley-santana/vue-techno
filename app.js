vm = new Vue({
  el: "#app",
  data: {
    products: [],
    productDetail: false,
    amount: 0,
    listProductInCart: [],
  },

  computed: {
    total() {
      if(this.listProductInCart.length > 0) {
        return this.listProductInCart.reduce(function(total, currentItem) {
          return total + currentItem.price
        }, 0);
      }
      return 0;
    }
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
      this.productDetail.inventory--;
      const { id, name, price } = this.productDetail;
      this.listProductInCart.push({id, name , price});
    },

    removeFromCart(index) {
      this.listProductInCart.splice(index, 1)
    },

    checkCart() {
      if(window.localStorage.userCart){
        this.listProductInCart = JSON.parse(window.localStorage.userCart);
      }
    }
  },

  filters: {
    formatCurrency(currency) {
      return currency.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    }
  },

  watch: {
    listProductInCart() {
      window.localStorage.userCart = JSON.stringify(this.listProductInCart);
    }
  },

  created() {
    this.getProducts();
    this.checkCart();
  },
});
