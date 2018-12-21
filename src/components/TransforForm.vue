<template>
    <div id="transforform">
        <form v-on:submit="formSubmit">
            <input type="text" v-model="textToTranslate">
            <select v-model="selopt">
                <option v-for="item in items" :key="item.index" :value="item">{{item}}</option>
            </select>
            <input type="submit" value="翻译">
        </form>
    </div>
</template>

<script>
export default {
    name: 'transforform',
    data() {
        return {
            textToTranslate: "",
            selopt: "en",
            items: []
        }
    },
    created() {
        this.getLang();
    },
    methods: {
        getLang() {
            this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20181221T084000Z.c86a35e9052e636a.dc6b7f089cd85aa62ed5f3acfa6f546a14faf523')
                .then((response)=>{
                    // console.log(response.body.dirs);
                    let set = new Set();
                    response.body.dirs.forEach(element => {
                        set.add(element.split('-')[0]);
                    });
                    this.items = Array.from(set);
                    this.selopt = this.items[0];
                })
        },
        formSubmit(event) {
            // alert(this.textToTranslate);
            let obj = {
                "text": this.textToTranslate,
                "lang": this.selopt
            }
            this.$emit('formsubmit', obj);
            event.preventDefault();
        }
    }
}
</script>

<style>

</style>


