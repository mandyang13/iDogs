<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />

    <div class="mybox">
      <el-tree
        ref="mytree"
        :data="tree"
        :props="defaultProps"
        :filter-node-method="filterNode"
        class="filter-tree"
        default-expand-all
        @node-click="handleNodeClick"
      />
      <div class="right">
        <p>Click on node! A random picture of that breed will be shown here!</p>
        <p>{{ breed }}</p>
        <img v-show="show" :src="img">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      filterText: "",
      tree: [],
      img: "",
      breed: "",
      show: false,
      data2: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              children: [
                {
                  label: "Level three 1-1-1",
                },
                {
                  label: "Level three 1-1-2",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
            },
            {
              label: "Level two 2-2",
            },
          ],
        },
        {
          label: "Level one 3",
          children: [
            {
              label: "Level two 3-1",
            },
            {
              label: "Level two 3-2",
            },
          ],
        },
        {
          label: "Level one 4",
          children: [],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.mytree.filter(val);
    },
  },
  mounted() {
    this.getList("https://dog.ceo/api/breeds/list/all");
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(e) {
      console.log(e)
      this.breed = e.label;
      this.fetch("https://dog.ceo/api/breed/" + e.label + "/images/random")
        .then((r) => {
          var obj = JSON.parse(r);
          this.img = obj.message;
          this.show = true;
          this.backToTop();
        })
        .catch((e) => {
          console.log(e);
          this.$message("Try breed instead of sub-breed")
          // alert("Try breed instead of sub-breed");
          this.$loading.hide();
        });
    },
    backToTop() {
      let speed = 30;
      var myTimer = setInterval(function () {
        document.documentElement.scrollTop = document.documentElement.scrollTop - speed;
        if (document.documentElement.scrollTop <= 0) {
          clearInterval(myTimer);
        }
      }, 30);
    },
    fetch(url) {
      this.$loading.show();
      let that = this;
      return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onload = function () {
          if (xhr.status == 200) {
            // alert("updated");
            that.$message("updated")
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
    getList(url) {
      this.fetch(url)
        .then((r) => {
          var obj = JSON.parse(r);
          this.makeTree(obj.message);
        })
        .catch((e) => {
          console.log(e);
          // alert(e);
          this.$message(e)
          this.$loading.hide();
        });
    },
    // {a:[],b:[],c:[d]}  ＝>
    // [{label:a, children:[]}, {label:b, children:[]}, {label:c, children:[label:d, children:[]]}]
    makeTree(data) {
      for (let key in data) {
        if (data[key].length == 0) {
          this.tree.push({ label: key, children: data[key] });
        } else {
          var children = [];
          for (let ele of data[key]) {
            children.push({ label: ele, children: [] });
          }
          this.tree.push({ label: key, children: children });
        }
      }
    },
  },
};
</script>

<style scoped>
.mybox {
  display: flex;
}
.el-tree {
  width: 50%;
}
.right {
  width: 50%;
  margin: 0 20px;
}
img {
  max-width: 100%;
  max-height: 100%;
}
</style>