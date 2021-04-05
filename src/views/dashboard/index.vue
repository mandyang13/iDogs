<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Hi! {{ name }}! Welcome to iDogs!</div>
    <div>
      Click here to see
      <el-input-number v-model="num" :min="1" :max="10" size="mini" />
      random dogs! (no more than 50)
      <el-button style="transform: scale(0.8)" @click="onGo">Go!</el-button>
    </div>
    <p>Click on image to see what breed it is</p>
    <a @click="onJump">See all breeds!</a>
    <div class="dropdown">
      <el-select v-model="myBreed" filterable placeholder="Please Select a Breed" @change="newBreed">
        <el-option
          v-for="(item, index) in breedsDict"
          :key="index"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="mybox">
      <div v-for="(img, index) in mylist" :key="index" class="item">
        <img
          :src="img"
          @click="
            dialogVisible = true;
            breed = img.split('/')[4];
          "
        />
      </div>
    </div>
    <el-button type="primary" round class="loadmore" @click="loadMore">Load More</el-button>
    <el-dialog title="Breed" :visible.sync="dialogVisible" width="30%">
      <span>{{ breed }}</span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      num: 4,
      dialogVisible: false,
      breed: "",
      myBreed: "",
      breedsDict: [],
      mylist: [
        //"https://images.dog.ceo/breeds/dachshund/dachshund-1920_640.jpg","https://images.dog.ceo/breeds/dachshund/dachshund-1920_640.jpg","https://images.dog.ceo/breeds/dachshund/dachshund-1920_640.jpg","https://images.dog.ceo/breeds/dachshund/dachshund-1920_640.jpg"
      ],
    };
  },
  created() {},
  mounted() {
    this.getBreedsDict("https://dog.ceo/api/breeds/list/all");
  },
  methods: {
    //encapsulated
    fetch(url) {
      this.$loading.show();
      let that = this;
      return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
          if (xhr.status == 200) {
            // alert("updated");
            that.$message("updated");
            that.$loading.hide();
            resolve(xhr.responseText);
          } else {
            reject(new Error(xhr.statusText));
          }
        };
        xhr.onerror = function () {
          reject(new Error(xhr.statusText));
        };
        xhr.send();
      });
    },
    // concat image list based on url
    getList(url) {
      this.fetch(url)
        .then((r) => {
          var obj = JSON.parse(r);
          this.mylist.push(...obj.message);
          // console.log(this.mylist);
        })
        .catch((e) => {
          console.log(e);
          this.$message(e);
          // alert(e);
          this.$loading.hide();
        });
    },
    // get dropdown dict -> encapsulated in dispatch
    getBreedsDict(url) {
      this.fetch(url)
        .then((r) => {
          var obj = JSON.parse(r);
          this.makeList(obj.message);
        })
        .catch((e) => {
          console.log(e);
          // alert(e);
          this.$message(e);
          this.$loading.hide();
        });
    },
    // helper func of getBreedsDict
    makeList(data) {
      for (let key in data) {
        if (data[key].length == 0) {
          this.breedsDict.push(key);
        }
      }
    },
    newBreed() {
      this.mylist = []
      this.getList(
        "https://dog.ceo/api/breed/" +
          this.myBreed +
          "/images/random/" +
          this.num
      );
    },
    loadMore() {
      if (this.myBreed == "") {
        this.getList("https://dog.ceo/api/breeds/image/random/" + this.num);
      } else {
        this.getList(
        "https://dog.ceo/api/breed/" +
          this.myBreed +
          "/images/random/" +
          this.num
        )
      }
    },
    onGo() {
      this.num = Math.floor(this.num);
      this.mylist = [];
      this.myBreed = '';
      this.getList("https://dog.ceo/api/breeds/image/random/" + this.num);
    },
    onJump() {
      this.$router.push("/breed");
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
a:hover {
  color: red;
}
.dropdown {
  margin: 20px 0;
}
.mybox {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
}
.item {
  border: 1px solid;
  // width: 80%;
  width: 40%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}
.item:hover {
  opacity: 0.6;
}
img {
  width: 100%;
  height: 100%;
  // max-width: 100%;
  // max-height: 100%;
}
.loadmore {
  width: 80%;
  // position: absolute; 位置大小会滞后加载 不知道为什么
  // bottom: 80px;
  // left: 10%;
  display: block;
  margin: 0 auto;
}
</style>
