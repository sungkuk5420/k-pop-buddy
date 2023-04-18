<template>
  <a-layout-content style="padding: 0 50px; height: 100%;;">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
      <a-breadcrumb-item>Users</a-breadcrumb-item>
    </a-breadcrumb>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '280px',height:'100%' }">
    <a-table :columns="columns" :data-source="listData"       :pagination="pagination">
      <span slot="createdAt" slot-scope="text">{{ convertedDateFormat(text) }}</span>
    </a-table>
    </div>
  </a-layout-content>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
import { getDatabase, ref, set, child, get } from 'firebase/database';

const columns = [
  {
    title: 'email',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'nickname',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    scopedSlots: { customRender: 'createdAt' },
    dataIndex: 'createdAt',
    title: 'createdAt',
    key: 'createdAt',
  },
];
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      columns,
      listData:[],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 10,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
    }
  },
  mounted() {
    // this.showLoading();
    setTimeout(() => {
      if(this.loginUser&&this.loginUser.isAdmin){
        this.getUsers()
      }else{
        this.$router.push('/login')
      }
    },200);
  },
  methods:{
    getUsers(){
      const thisObj = this;
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            const data = snapshot.val();
            let allUsers = [];
            snapshot.forEach((questionSnapshot) => {
              let data = questionSnapshot.val();
              allUsers.push({
                uid: questionSnapshot.key,
                ...data,
              });
            });
            console.log(allUsers)
            thisObj.listData = allUsers.sort((a, b)=>{
              return a.createdAt - b.createdAt;
            })
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};


</script>

<style>
.page-name{
  
}
</style>

<style>
/* Import Google font - Poppins & Noto */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital@1&family=Poppins:wght@400;500;600&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
::selection{
  color: #fff;
  background: #4db2ec;
}

.wrapper .captcha-area{
  display: flex;
  height: 35px;
  margin: 30px 0 20px;
  align-items: center;
  justify-content: space-between;
}
.captcha-area .captcha-img{
  height: 100%;
  width: 345px;
  user-select: none;
  background: #000;
  border-radius: 5px;
  position: relative;
}
.captcha-img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  opacity: 0.95;
}
.captcha-img .captcha{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  color: #fff;
  /* color: #000; */
  opacity: 0.5;
  text-decoration: line-through;
  font-size: 25px;
  text-align: center;
  letter-spacing: 10px;
  transform: translate(-50%, -50%);
  text-shadow: 2px 2px 2px #ffffff;
  text-shadow: 0px 0px 2px #b1b1b1;
  text-shadow: 2px 2px 2px #000;
  font-family: 'Noto Serif', serif;
}
.wrapper button{
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  background: #4db2ec;
  border-radius: 5px;
  transition: all 0.3s ease;
}
.wrapper button:hover{
  background: #2fa5e9;
}
.captcha-area .reload-btn{
  width: 50px;
  height: 100%;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.captcha-area .reload-btn i{
  transition: transform 0.3s ease;
}
.captcha-area .reload-btn:hover i{
  transform: rotate(15deg);
}
.wrapper .input-area{
  height: 60px;
  width: 100%;
  position: relative;
}
.input-area input{
  width: 100%;
  height: 100%;
  outline: none;
  padding-left: 20px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #bfbfbf;
}
.input-area input:is(:focus, :valid){
  padding-left: 19px;
  border: 2px solid #4db2ec;
}
.input-area input::placeholder{
  color: #bfbfbf;
}
.input-area .check-btn{
  position: absolute;
  right: 7px;
  top: 50%;
  font-size: 17px;
  height: 45px;
  padding: 0 20px;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
}
.input-area input:valid + .check-btn{
  opacity: 1;
  pointer-events: auto;
}
.wrapper .status-text{
  display: none;
  font-size: 18px;
  text-align: center;
  margin: 20px 0 -5px;
}

@media (max-width: 506px){
  body{
    padding: 0 10px;
  }
  .wrapper{
    padding: 22px 25px 35px;
  }
  .wrapper header{
    font-size: 25px;
  }
  .wrapper .captcha-area{
    height: 60px;
  }
  .captcha-area .captcha{
    font-size: 28px;
    letter-spacing: 5px;
  }
  .captcha-area .reload-btn{
    width: 60px;
    margin-left: 5px;
    font-size: 20px;
  }
  .wrapper .input-area{
    height: 55px;
  }
  .input-area .check-btn{
    height: 40px;
  }
  .wrapper .status-text{
    font-size: 15px;
  }
  .captcha-area .captcha-img{
    width: 250px;
  }
}
</style>