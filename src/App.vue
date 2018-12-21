<template>
  <div id="app">
    <h1>在线翻译</h1>
    <h5>简单/易用/便捷</h5>
    <div class="transforform">
      <transfor-form v-on:formsubmit="translateText"></transfor-form>
    </div>
    <div class="transforoutput">
      <transfor-output :transoutput="transoutput"></transfor-output>
    </div>
  </div>
</template>

<script>
import TransforForm from './components/TransforForm'
import TransforOutput from './components/TransforOutput'

export default {
  name: 'App',
  data() {
    return {
      transoutput: ""
    }
  },
  components: {
    'transfor-form': TransforForm,
    'transfor-output': TransforOutput
  },
  methods: {
    translateText(obj) {
      // alert(JSON.stringify(text));
      this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181221T084000Z.c86a35e9052e636a.dc6b7f089cd85aa62ed5f3acfa6f546a14faf523&text='+obj.text+'&lang=' + obj.lang)
        .then((response)=>{
          this.transoutput = response.body.text[0]
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
