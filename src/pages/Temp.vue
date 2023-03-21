<template>
  <q-page class="temp-page">
    <div class="container">
      <div class="top-wrapper">
        <div class="text">While working as the general director of Korea Plastic Surgery,</div>
        <div class="text">I worked on clinic management, domestic marketing, overseas marketing, market research,</div>
        <div class="text q-mb-lg">surgery cost determination, online counseling, offline counseling, patient management, postoperative care, dispute resolution, etc.</div>
        <div class="text q-mb-lg">Based on our service, we aim to ensure that foreigners get accurate information and receive proper medical services.</div>
        <div class="text">The following services are just the beginning.</div>
        <div class="text q-mb-lg">I am preparing various services for foreign patients and will be provided soon</div>
      </div>
      <div class="table-wrapper1">
        <q-table
          class="my-sticky-header-table"
          :data="data"
          :columns="columns"
          row-key="name"
          flat
          bordered
          :pagination="initialPagination"
        />
      </div>
      <div class="table-wrapper2">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Services list / Details of the service</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Private 1:1 online consultation</span>
            <span>( per half hour / kakaoTalk or WhatsApp )</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">In-depth clinic investigation</span>
            <span>( per clinic / Provide the report )</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Interpretation and price negotiation(counseling day)</span>
            <span>( per hour / incentive / Provide consultation report )</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Interpretation(surgery day) & CCTV check</span>
            <span>( per hour )</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Support for returning home after surgery</span>
            <span>( per hour / by car / Support for getting medication )</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Interpretation and support(last follow up day) </span>
            <span>( per hour / last follow up day / issuance of medical records and check the records )</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Side effect counseling, dispute counseling (online) </span>
            <span>( per half hour / kakaoTalk or WhatsApp )</span>
          </q-item>
          <q-item clickable v-ripple>
            <span style="font-weight: bold; margin-right: 5px;">Implementation of Dispute Resolution </span>
            <span>( Solution offer / Solution execution / Mediation with clinic )</span>
          </q-item>
        </q-list>
      </div>
      <div class="bottom-wrapper">
        <div class="bottom-text">Contact</div>
        <div class="bottom-text">KAKAO Talk : hongpyo99</div>
        <div class="bottom-text">Line : hongpyo99</div>
        <div class="bottom-text">WhatsApp : +821086333213</div>
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
          column1: 'Private 1:1 online consultation',
          column2: 'per half hour / kakaoTalk or WhatsApp',
        },
        {
          name: 'Services list',
          column1: 'In-depth clinic investigation',
          column2: 'per clinic / Provide the report',
        },
        {
          name: 'Services list',
          column1: 'Interpretation and price negotiation(counseling day)',
          column2: 'per hour / incentive / Provide consultation report',
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
          column1: 'Interpretation and support(last follow up day) ',
          column2: 'per hour / last follow up day / issuance of medical records and check the records',
        },
        {
          name: 'Services list',
          column1: 'Side effect counseling, dispute counseling (online) ',
          column2: 'per half hour / kakaoTalk or WhatsApp',
        },
        {
          name: 'Services list',
          column1: 'Implementation of Dispute Resolution ',
          column2: 'Solution offer / Solution execution / Mediation with clinic',
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
    padding: 40px;
    .table-wrapper1{
      display: block;
    }
    .table-wrapper2{
      display: none;
    }
    .top-wrapper{
      padding: 80px 0 40px;
    }
    .bottom-wrapper{
      padding: 0 40px 40px;
    }
  }  
 }
.temp-page{
  background: #3b4869;    
  padding: 15px;
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  .container{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .top-wrapper{
    padding: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      width: 870px;
    }
  }

  .q-table__bottom{
    display: none;
  }
  .text{
    color: #000;
    text-align: center;
  }
  .bottom-text{
    color: #000;
  }
}
</style>
