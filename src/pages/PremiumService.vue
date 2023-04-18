<template>
  <q-page class="temp-page">
    <div class="container">
      <div class="temp-page__title">
        Premium Service
      </div>
      <div class="top-wrapper">
        <div class="text bold-text q-mb-lg">“We offer you trust, not just service”
        </div>
        <div class="text q-mb-lg">“While working as the general manager(director) of an internationally famous plastic surgery clinic In Korea, I worked on clinic management, domestic marketing, overseas marketing, market research, surgery cost determination, online counseling, offline counseling, patient management, postoperative care, dispute resolution, etc.
        </div>
        <div class="text q-mb-lg">Also, as a person in charge of foreign patients, I met foreign patients and learned the hardships of foreign patients while consulting them in person.
        </div>
        <div class="text q-mb-lg">Foreign patients are choosing Korean clinics based only on some information about clinics and doctors. The information available to foreigners in Korea is very limited, and it is very difficult for foreigners to get accurate and detailed information.
And foreigners pay more for surgery than Koreans just because they are foreigners, they don't get proper care, and they don't know how to deal with problems.
        </div>
        <div class="text">Based on our service, we aim to ensure that foreigners get accurate information and receive proper medical services.
        </div>
      </div>
      <div class="qr-wrapper">
        <div style="position: relative;">
          <img src="~assets/qrcode-1.png" alt="" srcset="">
          <a style="    position: absolute;    right: 4px;    bottom: 22px;" href="https://line.me/ti/p/o9hp3pPM97" target="__blank">https://line.me/ti/p/o9hp3pPM97</a>
        </div>
        <div>
        <img src="~assets/qrcode-2.png" alt="" srcset="">
      </div>
      <div>
        <img src="~assets/qrcode-3.png" alt="" srcset="">
      </div>
      </div>
      <div style="padding:20px; background:white;">
      <div class="service-card">
        <img src="~assets/emo-1.png" alt="" srcset="">
        <div class="service-card__title">Online consultation & market research</div>
        <div class="service-card__sub-title">(per half hour / KAKAO or WhatsApp or LINE)</div>
        <div class="service-card__content">Provide patients with information to surgery and clinics through online consultation.</div>
      </div>
      <div class="service-card">
        <img src="~assets/emo-2.png" alt="" srcset="">
        <div class="service-card__title">Clinic investigating</div>
        <div class="service-card__sub-title">(per clinic / Provide report on the clinic)</div>
        <div class="service-card__content">Investigate in detail the reputation and information of the clinic that the patient wants to know, and provide the results to the client</div>
      </div>
      <div class="service-card">
        <img src="~assets/emo-3.png" alt="" srcset="">
        <div class="service-card__title">Interpretation and price negotiation(counseling day)</div>
        <div class="service-card__sub-title">(per hour / XX% of the negotiated difference / provide report on the consultation)</div>
        <div class="service-card__content">Accompanied by the clinic to provide interpretation and support negotiations for price discounts. And provide a consultation report.</div>
      </div>
      <div class="service-card">
        <img src="~assets/emo-4.png" alt="" srcset="">
        <div class="service-card__title">Interpretation(surgery day) & CCTV check</div>
        <div class="service-card__sub-title">(per hour / Deliver the patient's needs to the Doctor )</div>
        <div class="service-card__content">Deliver the patient's request to the Doctor and provide an interpreter to ensure that the patient has the desired surgery. And make sure the CCTV is working well.</div>
      </div>
      <div class="service-card">
        <img src="~assets/emo-5.png" alt="" srcset="">
        <div class="service-card__title">Support for returning home after surgery</div>
        <div class="service-card__sub-title">(per hour / by car / Support for getting medication)</div>
        <div class="service-card__content">Help the patient purchase medicine after surgery and take the patient to the accommodation.</div>
      </div>
      <div class="service-card">
        <img src="~assets/emo-6.png" alt="" srcset="">
        <div class="service-card__title">Interpretation and support(last follow up day)</div>
        <div class="service-card__sub-title">(per hour / last follow up day / issuance of medical records and check the records)</div>
        <div class="service-card__content">Support the patient's check-up interpreter, help the patient's medical records to be issued, and check the medical records.</div>
      </div>
      <div class="service-card">
        <img src="~assets/emo-7.png" alt="" srcset="">
        <div class="service-card__title">Postoperative counseling(botched), dispute counseling</div>
        <div class="service-card__sub-title">(per half hour / KAKAO or WhatsApp or LINE)</div>
        <div class="service-card__content">When there is a wrong operation or dispute with the clinic, suggest countermeasures and help resolve the dispute.</div>
      </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ComputedMixin from "../ComputedMixin";
import UtilMethodMixin from "../UtilMethodMixin";
export default {
  mixins: [ComputedMixin, UtilMethodMixin],
  data () {
    return {
      
      initialPagination: {
        rowsPerPage: 19
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'Services list',
          align: 'left',
          label: 'Services list',
          field: 'column1',
        },
        {
          name: 'Details of the service',
          align: 'left',
          label: 'Details of the service',
          field: 'column2',
        },
      ],
      columns2: [
        {
          name: 'Services list',
          align: 'left',
          label: 'Services list / Details of the service',
          field: 'column1',
        },
      ],

      data: [
        {
          name: 'Services list',
          column1: 'Online consultation & market research ',
          column2: 'per half hour / KAKAO or WhatsApp',
        },
        {
          name: 'Services list',
          column1: 'Clinic investigating',
          column2: 'per clinic / Provide report on the clinic',
        },
        {
          name: 'Services list',
          column1: 'Interpretation and price negotiation(counseling day)',
          column2: 'per hour / XX% of the negotiated difference / provide report on the consultation',
        },
        {
          name: 'Services list',
          column1: 'Interpretation(surgery day) & CCTV check',
          column2: 'per hour',
        },
        {
          name: 'Services list',
          column1: 'Support for returning home after surgery',
          column2: 'per hour / by car / Support for getting medication',
        },
        {
          name: 'Services list',
          column1: 'Interpretation and support(last follow up day)',
          column2: 'per hour / last follow up day / issuance of medical records and check the records',
        },
        {
          name: 'Services list',
          column1: 'Postoperative counseling(botched), dispute counseling ',
          column2: 'per half hour / KAKAO or WhatsApp',
        },
        {
          name: 'Services list',
          column1: 'Implementation of Dispute Resolution ',
          column2: 'Solution offer / Solution execution / Mediation with clinic / Mandatory issuance required',
        },
      ],
    }
  },
  mounted() {
  },
  methods:{
  }
};


</script>

<style lang="scss">
 .desktop{
  .temp-page{
    .table-wrapper1{
      display: block;
    }
    .table-wrapper2{
      display: none;
    }
    .bottom-wrapper{
      padding: 0 40px 40px;
    }
  }  
 }
.temp-page{
  background: #F8F8F8;    
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;

  &__title{
    font-family: Spoqa Han Sans Neo;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 24px;
    color: #000;
    padding-left: 20px;

  }

  .container{
    width: 100%;
    height: 100%;
    overflow: auto;
    max-width: 1080px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .top-wrapper{
    padding: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 20px;
  }
  .bottom-wrapper{
    padding: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .table-wrapper1{
    display: none;
    background: white;
    padding: 40px 40px 20px;
  }
  .table-wrapper2{
    background: white;
    padding: 10px;
      overflow-x: auto;
    span{
      word-break: normal;
    }
    .q-list{
      width: 1000px;
    }
  }

  .qr-wrapper{
    padding: 10px;
    display: flex;
    background: white;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .q-table__bottom{
    display: none;
  }

  .bold-text{
    font-weight: bold;
  }
  .text{
    color: #000;
    text-align: left;
  }
  .bottom-text{
    color: #000;
  }

  .service-card{
    border: 1px solid #DDDDDD;
    padding: 32px 20px;
    margin-bottom: 20px;
    img{
      margin-bottom: 11px;
    }
    &__title{
      font-family: Pretendard;
      font-size: 22px;
      font-weight: 700;
      line-height: 29px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 11px;
    }
    &__sub-title{
      margin-bottom: 11px;
      font-family: Spoqa Han Sans Neo;
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }
    &__content{
      margin-bottom: 11px;
      font-family: Spoqa Han Sans Neo;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: left;
    }

    &:nth-child(1){
      background: #F5EFE733;
    }
    &:nth-child(2){
      background: #E7F3F533;
    }
    &:nth-child(3){
      background: #FFF5E433;
    }
    &:nth-child(4){
      background: #FBEEEE33;
    }
    &:nth-child(5){
      background: #CDF0EA33;
    }
    &:nth-child(6){
      background: #F1F5E733;
    }
    &:nth-child(7){
      background: #D2DDE733;
    }
  }
}
</style>
