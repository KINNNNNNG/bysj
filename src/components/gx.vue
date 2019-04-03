<template>
  <div class="cj" id="cj">
    <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
      <el-step title="考试信息"></el-step>
      <el-step title="设计试卷"></el-step>
      <el-step title="发布考试"></el-step>
    </el-steps>
    <div v-if="active==1">
      <div style="width:800px" class="ksxx">
        <el-form ref="ksxx" :model="ksxx" label-width="100px">
          <el-form-item label="考试名称">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="考试须知">
            <el-input v-model="ksxz" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
          </el-form-item>
          <el-form-item label="考生参加方式">
            <el-radio v-model="cjfs" label="1">
              <b>口令考试：</b>只要输入考试口令就可以参加考试(防止陌生人参加)
            </el-radio>
            <el-radio v-model="cjfs" label="2">
              <b>安排考试：</b>指定考生或部门参加，考生使用账号和密码登录才可以参加考试
            </el-radio>
          </el-form-item>
          <el-form-item v-if="cjfs==1" label="考试口令">
            <el-input v-model="kskl"></el-input>
            <span>考生须输入此口令才能参加考试</span>
          </el-form-item>
          <el-form-item v-if="cjfs==2" label="考生安排">
            <el-transfer :titles="['所有考生','选择考生']" :data="allstudent" v-model="selectstudent"></el-transfer>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="next(1)">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="active == 2">
      <div v-if="sjtype==1">
        <div>
          <div style="margin-top:20px;margin-bottom:20px">
            <el-button @click="xztdt" icon="el-icon-plus">单选题</el-button>
            <el-button @click="dxtdt" icon="el-icon-plus">多选题</el-button>
            <el-button @click="tktdt" icon="el-icon-plus">填空题</el-button>
            <el-button @click="pdtdt" icon="el-icon-plus">判断题</el-button>
            <el-button @click="jdtdt" icon="el-icon-plus">简答题</el-button>
            <el-button @click="zhtdt" icon="el-icon-plus">综合题</el-button>
          </div>

          <div v-if="xzttable==1">
            <div class="table">
              <div style="line-height:40px">
                <b>单选题</b>
              </div>
            </div>
            <el-table
              :data="xztselectData"
              style="width:100%"
              :default-sort="{prop:'id',oder:'descending'}"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-html="getXzt_xx(scope.row.xx)"></div>
                </template>
              </el-table-column>
              <el-table-column label="题干">
                <template slot-scope="scope">
                  <span v-html="scope.row.tigan"></span>
                </template>
              </el-table-column>
              <el-table-column prop="da" label="答案" sortable></el-table-column>
              <el-table-column
                prop="nyd"
                label="难易度"
                :filters="nyd"
                :filter-method="nydFilter"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <span>{{nydLabel(scope.row.nyd)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fz" label="分值">
                <template slot="header" slot-scope="scope">
                  分值
                  <el-button
                    type="text"
                    @click="xztfzchangeAll(scope)"
                    v-if="xztfzAll==1&xztselectData.length!=0"
                  >批量修改分值</el-button>
                  <el-input
                    @keyup.enter="xztfzchangeAll"
                    @blur="xztfzchangeAll"
                    v-if="xztfzAll==2"
                    v-model="xztfzAllNum"
                  ></el-input>
                </template>
                <template slot-scope="scope">
                  <div @click="xztfzchange" v-if="xztfz==1">{{scope.row.fz}}</div>
                  <el-input
                    @keyup.enter="xztfzchange"
                    @blur="xztfzchange"
                    v-if="xztfz==2"
                    v-model="scope.row.fz"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-button @click="xztadd(scope)">添加试题</el-button>
                  <el-button type="danger" @click="xztdtDelete">删除选择题大题</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button type="danger" @click="xztDelete(scope.$index, xztselectData)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="dxttable==1">
            <div class="table">
              <div style="line-height:40px">
                <b>多选题</b>
              </div>
            </div>
            <el-table
              :data="dxtselectData"
              style="width:100%"
              :default-sort="{prop:'id',oder:'descending'}"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-html="getXzt_xx(scope.row.xx)"></div>
                </template>
              </el-table-column>
              <el-table-column label="题干" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.tigan"></span>
                </template>
              </el-table-column>
              <el-table-column prop="da" label="答案" sortable></el-table-column>
              <el-table-column
                prop="nyd"
                label="难易度"
                :filters="nyd"
                :filter-method="nydFilter"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <span>{{nydLabel(scope.row.nyd)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fz" label="分值">
                <template slot="header" slot-scope="scope">
                  分值
                  <el-button
                    type="text"
                    @click="dxtfzchangeAll(scope)"
                    v-if="dxtfzAll==1&dxtselectData.length!=0"
                  >批量修改分值</el-button>
                  <el-input @blur="dxtfzchangeAll" v-if="dxtfzAll==2" v-model="dxtfzAllNum"></el-input>
                </template>
                <template slot-scope="scope">
                  <div @click="dxtfzchange" v-if="dxtfz==1">{{scope.row.fz}}</div>
                  <el-input @blur="dxtfzchange" v-if="dxtfz==2" v-model="scope.row.fz"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-button @click="dxtadd(scope)">添加试题</el-button>
                  <el-button type="danger" @click="dxtdtDelete">删除多选题大题</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button type="danger" @click="dxtDelete(scope.$index, dxtselectData)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="tkttable==1">
            <div class="table">
              <div style="line-height:40px">
                <b>填空题</b>
              </div>
            </div>
            <el-table
              :data="tktselectData"
              style="width:100%"
              :default-sort="{prop:'id',oder:'descending'}"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-html="getTKt_da(scope.row.da)"></div>
                </template>
              </el-table-column>
              <el-table-column label="题干" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.tigan"></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="nyd"
                label="难易度"
                :filters="nyd"
                :filter-method="nydFilter"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <span>{{nydLabel(scope.row.nyd)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fz" label="分值">
                <template slot="header" slot-scope="scope">
                  分值
                  <el-button
                    type="text"
                    @click="tktfzchangeAll(scope)"
                    v-if="tktfzAll==1&tktselectData.length!=0"
                  >批量修改分值</el-button>
                  <el-input @blur="tktfzchangeAll" v-if="tktfzAll==2" v-model="tktfzAllNum"></el-input>
                </template>
                <template slot-scope="scope">
                  <div @click="tktfzchange" v-if="tktfz==1">{{scope.row.fz}}</div>
                  <el-input @blur="tktfzchange" v-if="tktfz==2" v-model="scope.row.fz"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-button @click="tktadd(scope)">添加试题</el-button>
                  <el-button type="danger" @click="tktdtDelete">删除多选题大题</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button type="danger" @click="tktDelete(scope.$index, tktselectData)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="pdttable==1">
            <div class="table">
              <div style="line-height:40px">
                <b>判断题</b>
              </div>
            </div>
            <el-table
              :data="pdtselectData"
              style="width:100%"
              :default-sort="{prop:'id',oder:'descending'}"
            >
              <el-table-column label="题干" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.tigan"></span>
                </template>
              </el-table-column>
              <el-table-column prop="da" label="答案" sortable></el-table-column>
              <el-table-column
                prop="nyd"
                label="难易度"
                :filters="nyd"
                :filter-method="nydFilter"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <span>{{nydLabel(scope.row.nyd)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fz" label="分值">
                <template slot="header" slot-scope="scope">
                  分值
                  <el-button
                    type="text"
                    @click="pdtfzchangeAll(scope)"
                    v-if="pdtfzAll==1&pdtselectData.length!=0"
                  >批量修改分值</el-button>
                  <el-input @blur="pdtfzchangeAll" v-if="pdtfzAll==2" v-model="pdtfzAllNum"></el-input>
                </template>
                <template slot-scope="scope">
                  <div @click="pdtfzchange" v-if="pdtfz==1">{{scope.row.fz}}</div>
                  <el-input @blur="pdtfzchange" v-if="pdtfz==2" v-model="scope.row.fz"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-button @click="pdtadd(scope)">添加试题</el-button>
                  <el-button type="danger" @click="pdtdtDelete">删除多选题大题</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button type="danger" @click="pdtDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="jdttable==1">
            <div class="table">
              <div style="line-height:40px">
                <b>简答题</b>
              </div>
            </div>
            <el-table
              :data="jdtselectData"
              style="width:100%"
              :default-sort="{prop:'id',oder:'descending'}"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <span>答案: {{scope.row.da}}</span>
                </template>
              </el-table-column>
              <el-table-column label="题干" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.tigan"></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="nyd"
                label="难易度"
                :filters="nyd"
                :filter-method="nydFilter"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <span>{{nydLabel(scope.row.nyd)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fz" label="分值">
                <template slot="header" slot-scope="scope">
                  分值
                  <el-button
                    type="text"
                    @click="pdtfzchangeAll(scope)"
                    v-if="pdtfzAll==1&pdtselectData.length!=0"
                  >批量修改分值</el-button>
                  <el-input @blur="pdtfzchangeAll" v-if="pdtfzAll==2" v-model="pdtfzAllNum"></el-input>
                </template>
                <template slot-scope="scope">
                  <div @click="pdtfzchange" v-if="pdtfz==1">{{scope.row.fz}}</div>
                  <el-input @blur="pdtfzchange" v-if="pdtfz==2" v-model="scope.row.fz"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-button @click="jdtadd(scope)">添加试题</el-button>
                  <el-button type="danger" @click="jdtdtDelete">删除多选题大题</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button type="danger" @click="jdtDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="zhttable==1">
            <div class="table">
              <div style="line-height:40px">
                <b>综合题</b>
              </div>
            </div>
            <el-table
              :data="zhtselectData"
              style="width:100%"
              :default-sort="{prop:'id',oder:'descending'}"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-html="getZht_tm(scope.row.da)"></div>
                </template>
              </el-table-column>
              <el-table-column label="题干" sortable>
                <template slot-scope="scope">
                  <span v-html="scope.row.tigan"></span>
                </template>
              </el-table-column>
              <el-table-column
                prop="nyd"
                label="难易度"
                :filters="nyd"
                :filter-method="nydFilter"
                filter-placement="bottom-end"
              >
                <template slot-scope="scope">
                  <span>{{nydLabel(scope.row.nyd)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="fz" label="分值">
                <template slot="header" slot-scope="scope">
                  分值
                  <el-button
                    type="text"
                    @click="zhtfzchangeAll(scope)"
                    v-if="zhtfzAll==1&zhtselectData.length!=0"
                  >批量修改分值</el-button>
                  <el-input @blur="zhtfzchangeAll" v-if="zhtfzAll==2" v-model="zhtfzAllNum"></el-input>
                </template>
                <template slot-scope="scope">
                  <div @click="dxtfzchange" v-if="dxtfz==1">{{scope.row.fz}}</div>
                  <el-input @blur="dxtfzchange" v-if="dxtfz==2" v-model="scope.row.fz"></el-input>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-button @click="zhtadd(scope)">添加试题</el-button>
                  <el-button type="danger" @click="zhtdtDelete">删除多选题大题</el-button>
                </template>
                <template slot-scope="scope">
                  <el-button type="danger" @click="zhtDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style="text-align: center;margin:20px">
            <el-button @click="next(-1)">上一步</el-button>
            <el-button
              v-if="(xzttable==1&xztselectData.length!=0)|(pdttable==1&pdtselectData.length!=0)|(dxttable==1&dxtselectData.length!=0)|(tkttable==1&tktselectData.length!=0)|(jdttable==1&jdtselectData.length!=0)|(zhttable==1&zhtselectData.length!=0)"
              type="primary"
              @click="sumbit"
            >保存&下一步</el-button>
          </div>
        </div>
      </div>
      <div v-if="sjtype==2">随机</div>
    </div>
    <div v-if="active == 3">
      <div v-if="sj.xzt.length>0">
        <h3>选择题</h3>
        <template v-for="(xzt, index) in sj.xzt">
          <div v-html="addnum(xzt.tigan,index)" :key="'xzt'+index"></div>
          <el-radio
            v-model="xztda[index].da"
            v-for="(item1, index1) in xzt.xx"
            :key="'xztda'+index+index1"
            :label="dxt_label(index1)"
          >{{dxt_label(index1)}}：{{item1.text}}</el-radio>
        </template>
      </div>
      <div v-if="sj.dxt.length>0">
        <h3>多选题</h3>
        <template v-for="(dxt, index) in sj.dxt">
          <div v-html="addnum(dxt.tigan,index)" :key="'dxt'+index"></div>
          <el-checkbox-group v-model="dxtda[index].da" :key="index">
            <el-checkbox
              v-for="(item, index1) in dxt.xx"
              :label="dxt_label(index1)"
              :key="'dxtda'+index+index1"
            >{{item.text}}</el-checkbox>
          </el-checkbox-group>
        </template>
      </div>
      <div v-if="sj.tkt.length>0">
        <h3>填空题</h3>
        <template v-for="(tkt, index) in sj.tkt">
          <div v-html="tktcontent(tkt,index)" :key="'tkt'+index"></div>
          <el-input
            v-for="(item, index1) in tkt.da"
            :key="'tktda'+index+index1"
            v-model="tktda[index].da[index1].da"
            style="width:150px;margin-right:20px"
            :placeholder="tktdatext(index1)"
          ></el-input>
        </template>
      </div>
      <div v-if="sj.pdt.length>0">
        <h3>判断题</h3>
        <template v-for="(pdt, index) in sj.pdt">
          <div v-html="addnum(pdt.tigan,index)" :key="'pdt'+index"></div>
          <el-radio v-model="pdtda[index]" label="对" :key="'pdtda0'+index">对</el-radio>
          <el-radio v-model="pdtda[index]" label="错" :key="'pdtda1'+index">错</el-radio>
        </template>
      </div>
      <div v-if="sj.jdt.length>0">
        <h3>简答题</h3>
        <template v-for="(jdt, index) in sj.jdt">
          <div v-html="addnum(jdt.tigan,index)" :key="'jdt'+index"></div>
          <el-input autosize type="textarea" v-model="jdtda[index].da" :key="'jdtda'+index"></el-input>
        </template>
      </div>
      <div v-if="sj.zht.length>0">
        <h3>综合题</h3>
        <template v-for="(zht, index) in sj.zht">
          <div v-html="addnum(zht.tigan,index)" :key="'zht'+index"></div>
          <template v-for="(item, index1) in zht.da">
            <div style="margin:10px" v-html="item.tm" :key="'zhttm'+index+index1"></div>
            <el-input
              autosize
              type="textarea"
              v-model="zhtda[index].da[index1].da"
              :key="'zhtda'+index+index1"
            ></el-input>
          </template>
        </template>
      </div>
      <el-button style="text-align:center" @click="finaly">完成</el-button>
    </div>
    <!-- <el-dialog title="请选择试卷类型" center width="30%" :visible.sync="selectsjtype">
      <el-radio v-model="sjtype" label="1" class="sjtyperadio">
        <b>固定试卷:</b>选择特定试题生成一份试卷
      </el-radio>
      <el-radio v-model="sjtype" label="2" class="sjtyperadio">
        <b>随机试卷:</b>给定试题范围和抽题数量抽题生成试卷
      </el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectsjtype = false">取 消</el-button>
        <el-button type="primary" @click="next">确 定</el-button>
      </span>
    </el-dialog>-->
    <el-dialog title="选择单选题试题" width="90%" :visible.sync="selectxzttm">
      <el-button @click="selectxzttm = false">取 消</el-button>
      <el-button type="primary" @click="addtoxzt">添 加</el-button>
      <el-table
        :data="xzt"
        style="width:100%"
        :default-sort="{prop:'id',oder:'descending'}"
        @selection-change="xztSelect"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-html="getXzt_xx(scope.row.xx)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column label="题干">
          <template slot-scope="scope">
            <span v-html="scope.row.tigan"></span>
          </template>
        </el-table-column>
        <el-table-column prop="da" label="答案" sortable></el-table-column>
        <el-table-column
          prop="nyd"
          label="难易度"
          :filters="nyd"
          :filter-method="nydFilter"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{nydLabel(scope.row.nyd)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="选择多选题试题" width="90%" :visible.sync="selectdxttm">
      <el-button @click="selectdxttm = false">取 消</el-button>
      <el-button type="primary" @click="addtodxt">添 加</el-button>
      <el-table
        :data="dxt"
        style="width:100%"
        :default-sort="{prop:'id',oder:'descending'}"
        @selection-change="dxtSelect"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-html="getXzt_xx(scope.row.xx)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column label="题干" sortable>
          <template slot-scope="scope">
            <span v-html="scope.row.tigan"></span>
          </template>
        </el-table-column>
        <el-table-column prop="da" label="答案" sortable></el-table-column>
        <el-table-column
          prop="nyd"
          label="难易度"
          :filters="nyd"
          :filter-method="nydFilter"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{nydLabel(scope.row.nyd)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="选择填空题试题" width="90%" :visible.sync="selecttkttm">
      <el-button @click="selecttkttm = false">取 消</el-button>
      <el-button type="primary" @click="addtotkt">添 加</el-button>
      <el-table
        :data="tkt"
        style="width:100%"
        :default-sort="{prop:'id',oder:'descending'}"
        @selection-change="tktSelect"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-html="getTKt_da(scope.row.da)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column label="题干" sortable>
          <template slot-scope="scope">
            <span v-html="scope.row.tigan"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nyd"
          label="难易度"
          :filters="nyd"
          :filter-method="nydFilter"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{nydLabel(scope.row.nyd)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="选择判断题试题" width="90%" :visible.sync="selectpdttm">
      <el-button @click="selectpdttm = false">取 消</el-button>
      <el-button type="primary" @click="addtopdt">添 加</el-button>
      <el-table
        :data="pdt"
        style="width:100%"
        :default-sort="{prop:'id',oder:'descending'}"
        @selection-change="pdtSelect"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column label="题干" sortable>
          <template slot-scope="scope">
            <span v-html="scope.row.tigan"></span>
          </template>
        </el-table-column>
        <el-table-column prop="da" label="答案" sortable></el-table-column>
        <el-table-column
          prop="nyd"
          label="难易度"
          :filters="nyd"
          :filter-method="nydFilter"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{nydLabel(scope.row.nyd)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="选择简答题试题" width="90%" :visible.sync="selectjdttm">
      <el-button @click="selectjdttm = false">取 消</el-button>
      <el-button type="primary" @click="addtojdt">添 加</el-button>
      <el-table
        :data="jdt"
        style="width:100%"
        :default-sort="{prop:'id',oder:'descending'}"
        @selection-change="jdtSelect"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <span>答案: {{scope.row.da}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column label="题干" sortable>
          <template slot-scope="scope">
            <span v-html="scope.row.tigan"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nyd"
          label="难易度"
          :filters="nyd"
          :filter-method="nydFilter"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{nydLabel(scope.row.nyd)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="选择综合题试题" width="90%" :visible.sync="selectzhttm">
      <el-button @click="selectzhttm = false">取 消</el-button>
      <el-button type="primary" @click="addtozht">添 加</el-button>
      <el-table
        :data="zht"
        style="width:100%"
        :default-sort="{prop:'id',oder:'descending'}"
        @selection-change="zhtSelect"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-html="getZht_tm(scope.row.da)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="ID" sortable></el-table-column>
        <el-table-column label="题干" sortable>
          <template slot-scope="scope">
            <span v-html="scope.row.tigan"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nyd"
          label="难易度"
          :filters="nyd"
          :filter-method="nydFilter"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <span>{{nydLabel(scope.row.nyd)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
      ksxx: [],
      name: "",
      ksxz: "",
      cjfs: "1",
      kskl: "",
      allstudent: [],
      selectstudent: [],
      sjtype: "1",
      selectsjtype: false,
      xzttable: 0,
      dxttable: 0,
      tkttable: 0,
      pdttable: 0,
      jdttable: 0,
      zhttable: 0,
      nyd: [
        {
          text: "无限制",
          value: "选项1"
        },
        {
          text: "简单",
          value: "选项2"
        },
        {
          text: "中等",
          value: "选项3"
        },
        {
          text: "困难",
          value: "选项4"
        }
      ],
      xztselectData: [],
      xztfz: 1,
      xztfzAll: 1,
      xztfzAllNum: 0,
      xzt: [],
      selectxzttm: false,
      xztselectId: [],
      dxtselectData: [],
      dxtfz: 1,
      dxtfzAll: 1,
      dxtfzAllNum: 0,
      dxt: [],
      selectdxttm: false,
      dxtselectId: [],
      tktselectData: [],
      tktfz: 1,
      tktfzAll: 1,
      tktfzAllNum: 0,
      tkt: [],
      selecttkttm: false,
      tktselectId: [],
      pdtselectData: [],
      pdtfz: 1,
      pdtfzAll: 1,
      pdtfzAllNum: 0,
      pdt: [],
      selectpdttm: false,
      pdtselectId: [],
      jdtselectData: [],
      jdtfz: 1,
      jdtfzAll: 1,
      jdtfzAllNum: 0,
      jdt: [],
      selectjdttm: false,
      jdtselectId: [],
      zhtselectData: [],
      zhtfz: 1,
      zhtfzAll: 1,
      zhtfzAllNum: 0,
      zht: [],
      selectzhttm: false,
      zhtselectId: [],
      sjID: 0,
      sj: [],
      xztda: [],
      dxtda: [],
      tktda: [],
      pdtda: [],
      jdtda: [],
      zhtda: []
    };
  },
  mounted() {
    this.randomNum();
    this.alls();
  },
  methods: {
    randomNum() {
      this.kskl = "";
      for (var i = 0; i < 6; i++) {
        this.kskl += Math.floor(Math.random() * 10);
      }
    },
    alls() {
      this.$http.get("/api/queryAllStudent").then(function(res) {
        res.body.forEach(element => {
          this.allstudent.push({
            label: element.name,
            key: element.id
          });
        });
      });
    },
    next(val) {
      if (val == 1) {
        if (this.cjfs == 2) {
          this.$http
            .post("/api/getstudent", {
              name: this.name,
              ksxz: this.ksxz,
              type: this.cjfs,
              ks: this.selectstudent
            })
            .then(function(res) {
              this.active++;
              this.selectsjtype = false;
            });
        }
        if (this.cjfs == 1) {
          this.$http
            .post("/api/getstudent", {
              name: this.name,
              ksxz: this.ksxz,
              type: this.cjfs,
              kl: this.kskl
            })
            .then(function(res) {
              this.active++;
              this.selectsjtype = false;
            });
        }
      }
      if (val == -1) {
        this.active--;
      }
    },
    nydLabel(nyd) {
      if (nyd == "选项1") {
        return "无限制";
      }
      if (nyd == "选项2") {
        return "简单";
      }
      if (nyd == "选项3") {
        return "中等";
      }
      if (nyd == "选项4") {
        return "困难";
      }
    },
    nydFilter(value, row) {
      return row.nyd === value;
    },
    xztdt() {
      this.xzttable = 1;
    },
    dxtdt() {
      this.dxttable = 1;
    },
    tktdt() {
      this.tkttable = 1;
    },
    pdtdt() {
      this.pdttable = 1;
    },
    jdtdt() {
      this.jdttable = 1;
    },
    zhtdt() {
      this.zhttable = 1;
    },
    dxt_label(index) {
      var label = index + 65;
      return String.fromCharCode(label);
    },
    getXzt_xx(xx) {
      var xzt_xx = "";
      var num = 0;
      xx.forEach(element => {
        xzt_xx += "<p>" + this.dxt_label(num) + "  :  " + element.text + "</p>";
        num++;
      });
      return xzt_xx;
    },
    getTKt_da(da) {
      var tkt_da = "";
      var num = 1;
      da.forEach(element => {
        tkt_da += "<p>空格" + num + "答案  :  " + element.text + "</p>";
        num++;
      });
      return tkt_da;
    },
    getZht_tm(da) {
      var zht_tm = "";
      var num = 1;
      da.forEach(element => {
        zht_tm +=
          "<p><b>" +
          num +
          " :  " +
          element.tm +
          "</b></p><p>" +
          element.da +
          "</p>";
        num++;
      });
      return zht_tm;
    },
    xztadd() {
      this.$http.get("/api/queryXztByUid").then(function(res) {
        this.xzt = res.body;
      });
      this.selectxzttm = true;
    },
    addtoxzt() {
      console.log(this.xztselectId);
      this.selectxzttm = false;
    },
    xztSelect(val) {
      this.xztselectData = val;
      console.log(this.xztselectData);
    },
    xztdtDelete() {
      this.xztselectData = [];
      this.xzttable = 0;
    },
    xztDelete(index, row) {
      row.splice(index, 1);
    },
    dxtadd() {
      this.$http.get("/api/queryDxtByUid").then(function(res) {
        this.dxt = res.body;
      });
      this.selectdxttm = true;
    },
    addtodxt() {
      this.selectdxttm = false;
    },
    dxtSelect(val) {
      this.dxtselectData = val;
      console.log(this.xztselectData);
    },
    dxtdtDelete() {
      this.dxtselectData = [];
      this.dxttable = 0;
    },
    dxtDelete(index, row) {
      row.splice(index, 1);
    },
    tktadd() {
      this.$http.get("/api/queryTktByUid").then(function(res) {
        this.tkt = res.body;
      });
      this.selecttkttm = true;
    },
    addtotkt() {
      this.selecttkttm = false;
    },
    tktSelect(val) {
      this.tktselectData = val;
    },
    tktdtDelete() {
      this.tktselectData = [];
      this.tkttable = 0;
    },
    tktDelete(index, row) {
      row.splice(index, 1);
    },
    pdtadd() {
      this.$http.get("/api/queryPdtByUid").then(function(res) {
        this.pdt = res.body;
      });
      this.selectpdttm = true;
    },
    addtopdt() {
      this.selectpdttm = false;
    },
    pdtSelect(val) {
      this.pdtselectData = val;
    },
    pdtdtDelete() {
      this.pdtselectData = [];
      this.pdttable = 0;
    },
    pdtDelete(index, row) {
      row.splice(index, 1);
    },
    jdtadd() {
      this.$http.get("/api/queryJdtByUid").then(function(res) {
        this.jdt = res.body;
      });
      this.selectjdttm = true;
    },
    addtojdt() {
      this.selectjdttm = false;
    },
    jdtSelect(val) {
      this.jdtselectData = val;
    },
    jdtdtDelete() {
      this.jdtselectData = [];
      this.jdttable = 0;
    },
    jdtDelete(index, row) {
      row.splice(index, 1);
    },
    zhtadd() {
      this.$http.get("/api/queryZhtByUid").then(function(res) {
        this.zht = res.body;
      });
      this.selectzhttm = true;
    },
    addtozht() {
      this.selectzhttm = false;
    },
    zhtSelect(val) {
      this.zhtselectData = val;
    },
    zhtdtDelete() {
      this.zhtselectData = [];
      this.zhttable = 0;
    },
    zhtDelete(index, row) {
      row.splice(index, 1);
    },
    xztfzchange() {
      if (this.xztfz == 1) {
        this.xztfz = 2;
      } else {
        this.xztfz = 1;
      }
    },
    xztfzchangeAll(val) {
      if (this.xztfzAll == 1) {
        this.xztfzAll = 2;
      } else {
        for (var i = 0; i < this.xztselectData.length; i++) {
          this.xztselectData[i].fz = this.xztfzAllNum;
        }
        this.xztfzAll = 1;
      }
    },
    dxtfzchange() {
      if (this.dxtfz == 1) {
        this.dxtfz = 2;
      } else {
        this.dxtfz = 1;
      }
    },
    dxtfzchangeAll(val) {
      if (this.dxtfzAll == 1) {
        this.dxtfzAll = 2;
      } else {
        for (var i = 0; i < this.dxtselectData.length; i++) {
          this.dxtselectData[i].fz = this.dxtfzAllNum;
        }
        this.dxtfzAll = 1;
      }
    },
    tktfzchange() {
      if (this.tktfz == 1) {
        this.tktfz = 2;
      } else {
        this.tktfz = 1;
      }
    },
    tktfzchangeAll(val) {
      if (this.tktfzAll == 1) {
        this.tktfzAll = 2;
      } else {
        for (var i = 0; i < this.tktselectData.length; i++) {
          this.tktselectData[i].fz = this.tktfzAllNum;
        }
        this.tktfzAll = 1;
      }
    },
    pdtfzchange() {
      if (this.pdtfz == 1) {
        this.pdtfz = 2;
      } else {
        this.pdtfz = 1;
      }
    },
    pdtfzchangeAll(val) {
      if (this.pdtfzAll == 1) {
        this.pdtfzAll = 2;
      } else {
        for (var i = 0; i < this.pdtselectData.length; i++) {
          this.pdtselectData[i].fz = this.pdtfzAllNum;
        }
        this.pdtfzAll = 1;
      }
    },
    jdtfzchange() {
      if (this.jdtfz == 1) {
        this.jdtfz = 2;
      } else {
        this.jdtfz = 1;
      }
    },
    jdtfzchangeAll(val) {
      if (this.jdtfzAll == 1) {
        this.jdtfzAll = 2;
      } else {
        for (var i = 0; i < this.jdtselectData.length; i++) {
          this.jdtselectData[i].fz = this.jdtfzAllNum;
        }
        this.jdtfzAll = 1;
      }
    },
    zhtfzchange() {
      if (this.zhtfz == 1) {
        this.zhtfz = 2;
      } else {
        this.zhtfz = 1;
      }
    },
    zhtfzchangeAll(val) {
      if (this.zhtfzAll == 1) {
        this.zhtfzAll = 2;
      } else {
        for (var i = 0; i < this.zhtselectData.length; i++) {
          this.zhtselectData[i].fz = this.zhtfzAllNum;
        }
        this.zhtfzAll = 1;
      }
    },
    sumbit() {
      this.$http
        .post("/api/getSj", {
          xzt: this.xztselectData,
          dxt: this.dxtselectData,
          tkt: this.tktselectData,
          pdt: this.pdtselectData,
          jdt: this.jdtselectData,
          zht: this.zhtselectData
        })
        .then(
          function(res) {
            this.sjID = res.bodyText;
            this.$http
              .post("/api/getSjContent?ID=" + this.sjID)
              .then(function(res) {
                this.sj = res.body;
                console.log(this.sj);
                this.sj.xzt.forEach(element => {
                  this.xztda.push({
                    id: element.id,
                    da: ""
                  });
                });
                this.sj.dxt.forEach(element => {
                  this.dxtda.push({
                    id: element.id,
                    da: []
                  });
                });
                for (var i = 0; i < this.sj.tkt.length; i++) {
                  this.tktda.push({
                    da: []
                  });
                  for (var j = 0; j < this.sj.tkt[i].da.length; j++) {
                    this.tktda[i].da.push({
                      id: this.sj.tkt[i].id,
                      kg: j,
                      da: ""
                    });
                  }
                }
                this.sj.pdt.forEach(element => {
                  this.pdtda.push({
                    id: element.id,
                    da: ""
                  });
                });
                this.sj.jdt.forEach(element => {
                  this.jdtda.push({
                    id: element.id,
                    da: ""
                  });
                });
                for (var i = 0; i < this.sj.zht.length; i++) {
                  this.zhtda.push({
                    da: []
                  });
                  for (var j = 0; j < this.sj.zht[i].da.length; j++) {
                    this.zhtda[i].da.push({
                      id: this.sj.zht[i].id,
                      tm: j,
                      da: ""
                    });
                  }
                }
                this.active++;
                console.log(this.sj);
                console.log(this.tktda);
              });
          },
          function(res) {
            this.$message.error(res.bodyText);
          }
        );
    },
    tktdatext(index) {
      var temp = index + 1;
      return "请填写第" + temp + "个空格答案";
    },
    addnum(tigan, index) {
      index = index + 1;
      return tigan.slice(0, 3) + index + "：" + tigan.slice(3);
    },
    tktcontent(tkt, index) {
      var tigan = this.addnum(tkt.tigan, index);
      for (var i = 0; i < tkt.da.length; i++) {
        var temp = i + 1;
        var re = "(__" + temp + "__)";
        tigan = tigan.replace("(___)", re);
        console.log(tigan);
      }
      return "<div>" + tigan + "</div>";
    },
    finaly() {
      this.name = "";
      this.ksxz = "";
      this.randomNum();
      this.xztselectData = [];
      this.dxtselectData = [];
      this.tktselectData = [];
      this.pdtselectData = [];
      this.zhtselectData = [];
      this.jdtselectData = [];
      this.active = 1;
    }
  }
};
</script>
<style>
.ksxx {
  margin: 40px;
}
.sjtyperadio {
  margin-top: 20px;
  margin-bottom: 20px;
}
.table {
  font-size: 16px;
  height: 40px;
  text-align: center;
  border-radius: 4px;
  background: #e4e7ed;
}
</style>


