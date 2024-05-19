<template>
    <main class="background">
    <div class="fade-in margin">
    <nav>
        <a><RouterLink to="/home">Home</RouterLink></a>
        <a><RouterLink to="/history">History</RouterLink></a>
        <a><RouterLink to="/data2">Pie Chart</RouterLink></a>
        <a><RouterLink to="/">Sign In</RouterLink></a>
        <a><RouterLink to="/register">Register</RouterLink></a>
        <button id="logout" @click="handleSignOut" v-if="isLoggedIn">Logout</button>
      </nav>
      <div class="history-view">
      <h1 class="view-title">Stock Purchase History</h1>
      <div v-if="purchaseHistory.length === 0">
        <p>No purchase history available.</p>
      </div>
      <div class="history-list" v-else>
        <div v-for="(purchase, index) in purchaseHistory" :key="index" class="purchase-item">
          <div class="purchase-info">
            <p><strong>Symbol:</strong> {{ purchase.symbol }}</p>
            <p><strong>Date Position Updated:</strong> {{ purchase.date }}</p>
            <p><strong>Quantity:</strong> {{ purchase.quantity }}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
    </main>
  </template>
  
  

  <script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  
  export default {
    name: 'HistoryView',
    data() {
      return {
        purchaseHistory: [],
      }
    },
    mounted() {
      const store = useStore()
      const historyData = store.state.history
      console.log(historyData)
  
      this.purchaseHistory = historyData.map(item => ({
        symbol: item.id,
        date: item.date,
        action: item.quantity > 0 ? 'Buy' : 'Sell',
        quantity: Math.abs(item.quantity)
      }))
    }
  };
  </script>
  
  <style scoped>

main {
  text-align: center;  
  font-family: 'Kanit';
}

  .history-view {
    padding: 20px;
  }
  
  .view-title {
    font-size: 32px;
    margin-bottom: 20px;
    color: white;
  }
  
  .history-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .purchase-item {
    width: calc(33.33% - 20px);
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: black;
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .purchase-info {
    font-size: 16px;
    color: white;
  }
  
  .purchase-info p {
    margin: 5px 0;
  }

  .background {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../../public/nyc.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

p { color:white}

h1, h2 {
  font-size: 56px;
  font-family: 'Kanit';
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.margin {
  margin-top: 15px;
}

.fade-in {
  animation: fade-in 1s ease-in-out forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

a {
  font-size: 22px;
  color: white;
  text-decoration: none;
  transition: all 0.45s;
  margin-right: 30px;

}

a:hover {
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEi%0D%0AIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhs%0D%0AaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB3aWR0%0D%0AaD0iMzkwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDM5MCA1MCIgZW5hYmxlLWJhY2tn%0D%0Acm91bmQ9Im5ldyAwIDAgMzkwIDUwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0i%0D%0Abm9uZSIgc3Ryb2tlPSIjZDk0ZjVjIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLW1pdGVybGlt%0D%0AaXQ9IjEwIiBkPSJNMCw0Ny41ODVjMCwwLDk3LjUsMCwxMzAsMAoJYzEzLjc1LDAsMjguNzQtMzgu%0D%0ANzc4LDQ2LjE2OC0xOS40MTZDMTkyLjY2OSw0Ni41LDI0My42MDMsNDcuNTg1LDI2MCw0Ny41ODVj%0D%0AMzEuODIxLDAsMTMwLDAsMTMwLDAiLz4KPC9zdmc+Cg==");
  animation: line 3s;
  color: #d94f5c;
}

@keyframes line {
  0% {
    background-position-x: 490px;
  }
}


  </style>