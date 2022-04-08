import {createStore} from 'vuex'

export default createStore({
  state: {
    isLoaded: false,
    comments: [],
    portfolio: [],
  },
  getters: {
    comments(state) {
      return state.comments
    },

    isLoaded(state) {
      return state.isLoaded;
    },

    portfolio(state) {
      return state.portfolio;
    },
  },

  actions: {
    async getComments(context) {
      try {
        context.commit('onLoader', true)
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=42');
        if (response.ok) {
        const result = await response.json();
        context.commit('changeStateComments', result);
        } else {
          throw new Error('Данные не получены. Проверьте url')
        }
      } catch(e) {
        console.error("Ошибка", e)
      } finally {
        context.commit('onLoader', false)
      }
    },

    async sendInfo(context, params) {
      const response = await fetch("https://first-vue-http-e4db9-default-rtdb.europe-west1.firebasedatabase.app/portfolio.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );

      context.commit('pushNewInfo', {
        id: Date.now(),
        ...params
      });
    },

    async getPortfolios(context) {
      try {
        const response = await fetch('https://first-vue-http-e4db9-default-rtdb.europe-west1.firebasedatabase.app/portfolio.json');
        if(!response.ok) {
          throw new Error('Ошибка. Не верный url')
        }
        const result = await response.json();
        context.commit('parsePortfolioInfo', result)
      } catch (e) {
        console.error('Ошибка', e)
      }
    },
  },

  mutations: {
    changeStateComments(state, comments) {
      return state.comments = comments;
    },

    onLoader(state, isLoad) {
      return state.isLoaded = isLoad
    },

    parsePortfolioInfo(state, infos) {
      if(infos !== null) {
     return state.portfolio = Object.keys(infos).map((key) => ({
        id: key,
        ...infos[key]
      }))
      }
    },

    pushNewInfo(state, info) {
      return state.portfolio.push(info);
    }
  },
})
