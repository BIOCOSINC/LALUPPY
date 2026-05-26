import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

// ── Firebase 설정 ──────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyCHsNhNwHAn_Oz0Kue9sVVQShA4euN22r4",
  authDomain: "laluppy-e69ff.firebaseapp.com",
  projectId: "laluppy-e69ff",
  storageBucket: "laluppy-e69ff.firebasestorage.app",
  messagingSenderId: "506732941150",
  appId: "1:506732941150:web:5fbf629fe765a8a82449cf"
};
const app = initializeApp(firebaseConfig);
const fs = getFirestore(app);
const san = k => k.replace(/\//g, "__");
const db = {
  get: async k => { try { const s = await getDoc(doc(fs,"kv",san(k))); return s.exists()?JSON.parse(s.data().v):null; } catch { return null; } },
  set: async (k,v) => { try { await setDoc(doc(fs,"kv",san(k)),{v:JSON.stringify(v),k}); return true; } catch { return false; } },
  list: async p => { try { const q=query(collection(fs,"kv"),where("k",">=",p),where("k","<",p+"\uf8ff")); const s=await getDocs(q); return s.docs.map(d=>d.data().k); } catch { return []; } }
};
// ──────────────────────────────────────────

const ADMIN_CODE = "LALUCELL2025";
const G = { L: "laroupi", S: "laroupisecret" };
const GN = { laroupi: "라루피", laroupisecret: "라루피시크릿" };
const GC = { laroupi: "#004638", laroupisecret: "#2A6B55" };
const GB = { laroupi: "#E6F0ED", laroupisecret: "#D6EBE3" };
const YEARS = [2024,2025,2026,2027,2028,2029,2030];
const MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12];

const BRAND = {
  logoUrl: null, logoText: "LALUPPY",
  primary: "#004638", primaryLight: "#E6F0ED",
  secondary: "#9DC3AF", neutral: "#898D8D",
};

async function compressImage(file) {
  return new Promise(res => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX = 600, q = 0.55;
        let w = img.width, h = img.height;
        if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        res(c.toDataURL("image/jpeg", q));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function blankAct(grade) {
  const virals = Array(5).fill(0).map(() => ({ link: "", photo: null }));
  if (grade === G.L) return { blogs: [{ link: "" }, { link: "" }], virals, extras: [] };
  return { virals, extras: [] };
}

export default function App() {
  const [view, setView] = useState("login");
  const [adminMode, setAdminMode] = useState(false);
  const [lf, setLf] = useState({ gen: "", nick: "", phone: "", code: "" });
  const [lerr, setLerr] = useState("");
  const [me, setMe] = useState(null);
  const [sp, setSp] = useState("notices");
  const [myNotices, setMyNotices] = useState([]);
  const [savedMonths, setSavedMonths] = useState([]);
  const [yr, setYr] = useState(new Date().getFullYear());
  const [mo, setMo] = useState(new Date().getMonth() + 1);
  const [act, setAct] = useState(null);
  const [savMsg, setSavMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [myInquiries, setMyInquiries] = useState([]);
  const [iqf, setIqf] = useState({ title: "", content: "" });
  const [iqMsg, setIqMsg] = useState("");
  const [iqSending, setIqSending] = useState(false);
  const [atab, setAtab] = useState("supporters");
  const [supps, setSupps] = useState([]);
  const [nlp, setNlp] = useState([]);
  const [nsc, setNsc] = useState([]);
  const [nGrade, setNGrade] = useState(G.L);
  const [nf, setNf] = useState({ title: "", content: "" });
  const [nmsg, setNmsg] = useState("");
  const [af, setAf] = useState({ gen: "", nick: "", phone: "" });
  const [amsg, setAmsg] = useState("");
  const [viewSupp, setViewSupp] = useState(null);
  const [viewActs, setViewActs] = useState([]);
  const [loadingVA, setLoadingVA] = useState(false);
  const [actYear, setActYear] = useState(new Date().getFullYear());
  const [actMonth, setActMonth] = useState(new Date().getMonth() + 1);
  const [actGen, setActGen] = useState("전체");
  const [actSummary, setActSummary] = useState({});
  const [loadingSum, setLoadingSum] = useState(false);
  const [allInquiries, setAllInquiries] = useState([]);
  const [selInquiry, setSelInquiry] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyMsg, setReplyMsg] = useState("");
  const [loadingIq, setLoadingIq] = useState(false);
  const [excelPreview, setExcelPreview] = useState([]);
  const [excelErr, setExcelErr] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (view === "admin") {
      db.get("supporters").then(d => { const l = d||[]; setSupps(l); loadActSummary(actYear, l); });
      db.get("notices:laroupi").then(d => setNlp(d||[]));
      db.get("notices:laroupisecret").then(d => setNsc(d||[]));
    }
  }, [view]);

  useEffect(() => {
    if (me) {
      db.get(`notices:${me.grade}`).then(d => setMyNotices(d||[]));
      loadMySaved(me.id);
      loadMyInquiries(me.id);
    }
  }, [me]);

  const loadMySaved = async uid => {
    const keys = await db.list(`activity:${uid}:`);
    setSavedMonths(keys.map(k => { const p = k.split(":"); return { year: +p[2], month: +p[3] }; }).sort((a,b) => b.year-a.year||b.month-a.month));
  };
  const loadMyInquiries = async uid => setMyInquiries(await db.get(`inquiries:${uid}`) || []);

  const loadActSummary = async (year, suppList) => {
    const list = suppList !== undefined ? suppList : supps;
    if (!list.length) return;
    setLoadingSum(true);
    const summary = {};
    for (const s of list) {
      const keys = await db.list(`activity:${s.id}:${year}:`);
      summary[s.id] = {};
      for (const k of keys) {
        const d = await db.get(k);
        if (d) {
          const month = +k.split(":")[3];
          const bc = (d.blogs||[]).filter(b=>b.link).length;
          const vc = (d.virals||[]).filter(v=>v.link||v.photo).length;
          const ec = (d.extras||[]).filter(e=>e.link||e.photo).length;
          summary[s.id][month] = { blogs:bc, virals:vc, extras:ec, total:bc+vc+ec };
        }
      }
    }
    setActSummary(summary); setLoadingSum(false);
  };

  const doLogin = async () => {
    if (adminMode) {
      if (lf.code === ADMIN_CODE) { setView("admin"); setLerr(""); }
      else setLerr("관리자 코드가 올바르지 않습니다.");
      return;
    }
    if (!lf.gen||!lf.nick||!lf.phone) { setLerr("모든 항목을 입력해 주세요."); return; }
    const list = await db.get("supporters") || [];
    const found = list.find(s => s.gen===lf.gen.trim()&&s.nick===lf.nick.trim()&&s.phone===lf.phone.trim());
    if (found) { setMe(found); setView("supporter"); setLerr(""); setSp("notices"); }
    else setLerr("일치하는 정보를 찾을 수 없습니다. 관리자에게 문의해 주세요.");
  };

  const selectMonth = async (year, month) => {
    setYr(year); setMo(month);
    const saved = await db.get(`activity:${me.id}:${year}:${month}`);
    setAct(saved || blankAct(me.grade)); setSp("activity");
  };

  const doSave = async () => {
    setSaving(true);
    const ok = await db.set(`activity:${me.id}:${yr}:${mo}`, { ...act, year:yr, month:mo });
    setSavMsg(ok ? "저장 완료! ✓" : "저장에 실패했습니다.");
    if (ok) loadMySaved(me.id);
    setTimeout(() => setSavMsg(""), 2500); setSaving(false);
  };

  const uploadPhoto = async (setter, file) => { if (!file) return; setter(await compressImage(file)); };

  const updBlog = (i,v) => setAct(a => ({...a, blogs:a.blogs.map((b,j)=>j===i?{link:v}:b)}));
  const addBlog = () => setAct(a => ({...a, blogs:[...a.blogs,{link:""}]}));
  const delBlog = i => setAct(a => ({...a, blogs:a.blogs.filter((_,j)=>j!==i)}));
  const updViral = (i,f,v) => setAct(a => ({...a, virals:a.virals.map((x,j)=>j===i?{...x,[f]:v}:x)}));
  const addViral = () => setAct(a => ({...a, virals:[...a.virals,{link:"",photo:null}]}));
  const delViral = i => setAct(a => ({...a, virals:a.virals.filter((_,j)=>j!==i)}));
  const updExtra = (i,f,v) => setAct(a => ({...a, extras:a.extras.map((x,j)=>j===i?{...x,[f]:v}:x)}));
  const addExtra = () => setAct(a => ({...a, extras:[...a.extras,{link:"",photo:null}]}));
  const delExtra = i => setAct(a => ({...a, extras:a.extras.filter((_,j)=>j!==i)}));

  const sendInquiry = async () => {
    if (!iqf.title||!iqf.content) { setIqMsg("제목과 내용을 입력해 주세요."); return; }
    setIqSending(true);
    const list = await db.get(`inquiries:${me.id}`) || [];
    const next = [{id:`iq${Date.now()}`,title:iqf.title,content:iqf.content,date:new Date().toLocaleDateString("ko-KR"),reply:null,replyDate:null},...list];
    if (await db.set(`inquiries:${me.id}`, next)) { setMyInquiries(next); setIqf({title:"",content:""}); setIqMsg("문의가 전송되었습니다! ✓"); }
    else setIqMsg("전송에 실패했습니다.");
    setTimeout(() => setIqMsg(""), 2500); setIqSending(false);
  };

  const addSupporter = async () => {
    const {gen,nick,phone} = af;
    if (!gen||!nick||!phone) { setAmsg("모든 항목을 입력해 주세요."); return; }
    const list = await db.get("supporters") || [];
    if (list.find(s=>s.gen===gen.trim()&&s.nick===nick.trim())) { setAmsg("동일 기수/닉네임이 존재합니다."); return; }
    const next = [...list,{id:`s${Date.now()}`,gen:gen.trim(),nick:nick.trim(),phone:phone.trim(),grade:G.L,joinDate:new Date().toLocaleDateString("ko-KR")}];
    await db.set("supporters", next); setSupps(next);
    setAf({gen:"",nick:"",phone:""}); setAmsg("등록 완료! ✓"); setTimeout(()=>setAmsg(""),2000);
  };

  const changeGrade = async (id, grade) => {
    const next = supps.map(s=>s.id===id?{...s,grade}:s);
    await db.set("supporters", next); setSupps(next);
  };
  const delSupporter = async id => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const next = supps.filter(s=>s.id!==id);
    await db.set("supporters", next); setSupps(next);
    if (viewSupp?.id===id) setViewSupp(null);
  };

  const saveNotice = async () => {
    if (!nf.title||!nf.content) { setNmsg("제목과 내용을 입력해 주세요."); return; }
    const list = nGrade===G.L ? [...nlp] : [...nsc];
    list.unshift({id:`n${Date.now()}`,title:nf.title,content:nf.content,date:new Date().toLocaleDateString("ko-KR")});
    await db.set(`notices:${nGrade}`, list);
    nGrade===G.L ? setNlp(list) : setNsc(list);
    setNf({title:"",content:""}); setNmsg("등록 완료! ✓"); setTimeout(()=>setNmsg(""),2000);
  };
  const delNotice = async (grade, id) => {
    const list = (grade===G.L?nlp:nsc).filter(n=>n.id!==id);
    await db.set(`notices:${grade}`, list);
    grade===G.L ? setNlp(list) : setNsc(list);
  };

  const openSuppActs = async supp => {
    setViewSupp(supp); setLoadingVA(true);
    const keys = await db.list(`activity:${supp.id}:`);
    const acts = [];
    for (const k of keys) { const d = await db.get(k); if (d) acts.push(d); }
    acts.sort((a,b)=>b.year-a.year||b.month-a.month);
    setViewActs(acts); setLoadingVA(false);
  };

  const loadAllInquiries = async () => {
    setLoadingIq(true);
    const list = await db.get("supporters") || [];
    const result = [];
    for (const s of list) {
      const iqs = await db.get(`inquiries:${s.id}`) || [];
      iqs.forEach(iq => result.push({...iq,suppId:s.id,suppName:`${s.gen} · ${s.nick}`,grade:s.grade}));
    }
    result.sort((a,b)=>b.id.localeCompare(a.id));
    setAllInquiries(result); setLoadingIq(false);
  };

  const sendReply = async () => {
    if (!replyText.trim()) { setReplyMsg("답변 내용을 입력해 주세요."); return; }
    const iqs = await db.get(`inquiries:${selInquiry.suppId}`) || [];
    const next = iqs.map(iq=>iq.id===selInquiry.id?{...iq,reply:replyText.trim(),replyDate:new Date().toLocaleDateString("ko-KR")}:iq);
    if (await db.set(`inquiries:${selInquiry.suppId}`, next)) {
      const updated = {...selInquiry,reply:replyText.trim(),replyDate:new Date().toLocaleDateString("ko-KR")};
      setSelInquiry(updated);
      setAllInquiries(prev=>prev.map(iq=>iq.id===selInquiry.id?updated:iq));
      setReplyMsg("답변 등록 완료! ✓"); setReplyText("");
    } else setReplyMsg("등록에 실패했습니다.");
    setTimeout(()=>setReplyMsg(""),2500);
  };

  const handleExcelUpload = async file => {
    setExcelErr(""); setExcelPreview([]);
    try {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
      const parsed = rows.slice(1).filter(r=>r[0]||r[1]||r[2])
        .map(r=>({gen:String(r[0]||"").trim(),nick:String(r[1]||"").trim(),phone:String(r[2]||"").trim()}))
        .filter(r=>r.gen&&r.nick&&r.phone);
      if (!parsed.length) { setExcelErr("유효한 데이터가 없습니다."); return; }
      setExcelPreview(parsed);
    } catch { setExcelErr("파일을 읽을 수 없습니다."); }
  };

  const confirmExcelUpload = async () => {
    const existing = await db.get("supporters") || [];
    let added = 0;
    for (const p of excelPreview) {
      if (!existing.find(s=>s.gen===p.gen&&s.nick===p.nick)) {
        existing.push({id:`s${Date.now()}_${Math.random().toString(36).slice(2,6)}`,...p,grade:G.L,joinDate:new Date().toLocaleDateString("ko-KR")});
        added++;
      }
    }
    await db.set("supporters", existing); setSupps(existing);
    setExcelPreview([]); setAmsg(`${added}명 등록 완료! (중복 ${excelPreview.length-added}건 제외)`);
    setTimeout(()=>setAmsg(""),3000);
  };

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([["기수","닉네임","전화번호끝자리"],["1기","예시닉네임","1234"]]);
    ws["!cols"] = [{wch:10},{wch:15},{wch:16}];
    XLSX.utils.book_append_sheet(wb, ws, "써포터즈목록");
    XLSX.writeFile(wb, "써포터즈_등록_양식.xlsx");
  };

  const downloadActivityExcel = async () => {
    setDownloading(true);
    const wb = XLSX.utils.book_new();
    const sum=[["기수","닉네임","등급","년도","월","총건수","블로그","바이럴","기타"]];
    const blog=[["기수","닉네임","등급","년도","월","순번","링크"]];
    const viral=[["기수","닉네임","등급","년도","월","순번","링크","사진등록"]];
    const extra=[["기수","닉네임","등급","년도","월","순번","링크","사진등록"]];
    for (const s of supps) {
      const grade = GN[s.grade];
      const keys = await db.list(`activity:${s.id}:`);
      for (const k of keys.sort()) {
        const d = await db.get(k); if (!d) continue;
        const bc=(d.blogs||[]).filter(b=>b.link).length, vc=(d.virals||[]).filter(v=>v.link||v.photo).length, ec=(d.extras||[]).filter(e=>e.link||e.photo).length;
        sum.push([s.gen,s.nick,grade,d.year,d.month,bc+vc+ec,bc,vc,ec]);
        (d.blogs||[]).forEach((b,i)=>{ if(b.link) blog.push([s.gen,s.nick,grade,d.year,d.month,i+1,b.link]); });
        (d.virals||[]).forEach((v,i)=>{ if(v.link||v.photo) viral.push([s.gen,s.nick,grade,d.year,d.month,i+1,v.link||"",v.photo?"O":"X"]); });
        (d.extras||[]).forEach((e,i)=>{ if(e.link||e.photo) extra.push([s.gen,s.nick,grade,d.year,d.month,i+1,e.link||"",e.photo?"O":"X"]); });
      }
    }
    [["활동요약",sum],["블로그",blog],["바이럴",viral],["기타",extra]].forEach(([name,data])=>{
      const ws=XLSX.utils.aoa_to_sheet(data); ws["!cols"]=Array(data[0].length).fill({wch:14});
      XLSX.utils.book_append_sheet(wb,ws,name);
    });
    XLSX.writeFile(wb,`LALUPPY_활동내역_${new Date().toLocaleDateString("ko-KR").replace(/\./g,"").replace(/ /g,"")}.xlsx`);
    setDownloading(false);
  };

  const PC=BRAND.primary, BG="#FAF8F5", CARD="#fff", BORDER="#E8E0D5", TEXT="#2C2C2C", MUTED="#888";
  const inp={width:"100%",padding:"10px 14px",border:`1px solid ${BORDER}`,borderRadius:8,fontSize:14,outline:"none",boxSizing:"border-box",background:"#FAFAFA",marginBottom:10,fontFamily:"inherit"};
  const btn=(bg,color="#fff",sm)=>({background:bg,color,border:"none",borderRadius:sm?6:8,padding:sm?"5px 10px":"11px 18px",fontSize:sm?12:14,fontWeight:700,cursor:"pointer"});
  const card={background:CARD,borderRadius:14,padding:18,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",marginBottom:14};
  const tag=g=>({display:"inline-block",padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:700,background:GB[g],color:GC[g]});
  const lbl={fontSize:12,fontWeight:700,color:MUTED,marginBottom:4,display:"block"};
  const ctr={maxWidth:500,margin:"0 auto",padding:"0 16px"};
  const sel={border:`1px solid ${BORDER}`,borderRadius:8,padding:"6px 10px",fontSize:13,fontWeight:700,color:PC,background:BRAND.primaryLight,cursor:"pointer",outline:"none"};

  const Logo=({dark})=>BRAND.logoUrl
    ?<img src={BRAND.logoUrl} alt="logo" style={{height:30,objectFit:"contain"}}/>
    :<span style={{fontFamily:"'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif",fontWeight:900,fontSize:20,letterSpacing:"0.05em",color:dark?"#fff":PC}}>{BRAND.logoText}</span>;

  const photoField=(src,setter)=>(
    <div style={{marginTop:6,marginBottom:4}}>
      {src?(
        <div style={{position:"relative",display:"inline-block"}}>
          <img src={src} alt="" style={{maxWidth:180,maxHeight:140,borderRadius:8,border:`1px solid ${BORDER}`,objectFit:"cover",display:"block"}}/>
          <button onClick={()=>setter(null)} style={{position:"absolute",top:4,right:4,background:"rgba(0,0,0,0.55)",color:"#fff",border:"none",borderRadius:12,width:22,height:22,cursor:"pointer",fontSize:13}}>×</button>
        </div>
      ):(
        <label style={{display:"block",border:`1.5px dashed ${BORDER}`,borderRadius:8,padding:"10px 14px",textAlign:"center",cursor:"pointer",fontSize:12,color:MUTED,background:"#FAFAFA"}}>
          📷 사진 업로드
          <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>e.target.files[0]&&uploadPhoto(setter,e.target.files[0])}/>
        </label>
      )}
    </div>
  );

  if (view==="login") return (
    <div style={{minHeight:"100vh",background:BG,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Noto Sans KR',sans-serif",padding:16}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          {BRAND.logoUrl?<img src={BRAND.logoUrl} alt="logo" style={{height:48,objectFit:"contain",marginBottom:8}}/>
            :<div style={{fontFamily:"'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif",fontWeight:900,fontSize:32,color:PC,letterSpacing:"0.05em",marginBottom:8}}>{BRAND.logoText}</div>}
          <div style={{fontSize:13,color:MUTED}}>써포터즈 활동 관리 플랫폼</div>
        </div>
        <div style={{...card,padding:24}}>
          <div style={{display:"flex",background:"#F0EBE4",borderRadius:10,padding:4,marginBottom:20}}>
            {[false,true].map(isA=>(
              <button key={String(isA)} onClick={()=>{setAdminMode(isA);setLerr("");}}
                style={{flex:1,padding:"9px 0",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,background:adminMode===isA?CARD:"transparent",color:adminMode===isA?PC:MUTED,boxShadow:adminMode===isA?"0 1px 4px rgba(0,0,0,0.1)":"none"}}>
                {isA?"관리자":"써포터즈"}
              </button>
            ))}
          </div>
          {!adminMode?(<>
            <label style={lbl}>기수</label>
            <input style={inp} placeholder="예: 1기" value={lf.gen} onChange={e=>setLf(f=>({...f,gen:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            <label style={lbl}>닉네임</label>
            <input style={inp} placeholder="닉네임" value={lf.nick} onChange={e=>setLf(f=>({...f,nick:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
            <label style={lbl}>전화번호 끝 4자리</label>
            <input style={inp} placeholder="예: 5678" maxLength={4} value={lf.phone} onChange={e=>setLf(f=>({...f,phone:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
          </>):(<>
            <label style={lbl}>관리자 코드</label>
            <input style={inp} type="password" placeholder="관리자 코드 입력" value={lf.code} onChange={e=>setLf(f=>({...f,code:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()}/>
          </>)}
          {lerr&&<div style={{color:"#C0392B",fontSize:13,marginBottom:10,textAlign:"center"}}>{lerr}</div>}
          <button onClick={doLogin} style={{...btn(PC),width:"100%",marginTop:4}}>로그인</button>
        </div>
      </div>
    </div>
  );

  if (view==="supporter"&&me) {
    const isL=me.grade===G.L;
    return (
      <div style={{minHeight:"100vh",background:BG,fontFamily:"'Noto Sans KR',sans-serif",color:TEXT,paddingBottom:60}}>
        <div style={{background:CARD,borderBottom:`1px solid ${BORDER}`,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 6px rgba(0,0,0,0.05)"}}>
          <div><Logo/><div style={{fontSize:11,color:MUTED,marginTop:2}}>{me.gen} · {me.nick}&nbsp;<span style={tag(me.grade)}>{GN[me.grade]}</span></div></div>
          <div style={{display:"flex",gap:5}}>
            {[["notices","공지"],["months","활동"],["inquiry","문의"]].map(([id,label])=>(
              <button key={id} onClick={()=>setSp(id)} style={btn(sp===id?PC:"#EEE8E0",sp===id?"#fff":TEXT,true)}>{label}</button>
            ))}
            <button onClick={()=>{setView("login");setMe(null);setLf({gen:"",nick:"",phone:"",code:""});}} style={btn("#FDECEA","#C0392B",true)}>로그아웃</button>
          </div>
        </div>
        <div style={{...ctr,paddingTop:20}}>
          {sp==="notices"&&(<>
            <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>📢 공지사항</div>
            {myNotices.length===0?<div style={{...card,textAlign:"center",color:MUTED,padding:40}}>등록된 공지사항이 없습니다.</div>
              :myNotices.map(n=>(<div key={n.id} style={card}><div style={{fontWeight:700,marginBottom:6}}>{n.title}</div><div style={{fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{n.content}</div><div style={{fontSize:11,color:MUTED,marginTop:8}}>{n.date}</div></div>))}
            <button onClick={()=>setSp("months")} style={{...btn(PC),width:"100%",marginTop:4}}>활동 내역 입력하기 →</button>
          </>)}
          {sp==="months"&&(<>
            <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>📅 활동 월 선택</div>
            <div style={card}>
              <label style={lbl}>년도</label>
              <select value={yr} onChange={e=>setYr(Number(e.target.value))} style={{...inp}}>{YEARS.map(y=><option key={y} value={y}>{y}년</option>)}</select>
              <label style={lbl}>월</label>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:4}}>
                {MONTHS.map(m=>{const saved=savedMonths.some(s=>s.year===yr&&s.month===m);return(
                  <button key={m} onClick={()=>selectMonth(yr,m)} style={{padding:"12px 0",borderRadius:10,border:`2px solid ${saved?PC:BORDER}`,background:saved?BRAND.primaryLight:CARD,color:saved?PC:TEXT,fontWeight:700,cursor:"pointer",fontSize:14,position:"relative"}}>
                    {m}월{saved&&<span style={{position:"absolute",top:5,right:5,width:6,height:6,borderRadius:3,background:PC,display:"block"}}/>}
                  </button>
                );})}
              </div>
              {savedMonths.length>0&&<div style={{fontSize:11,color:MUTED,marginTop:12}}>💡 저장된 월은 컬러 테두리로 표시됩니다.</div>}
            </div>
          </>)}
          {sp==="activity"&&act&&(<>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
              <button onClick={()=>setSp("months")} style={btn("#EEE8E0",TEXT,true)}>← 월 선택</button>
              <div style={{fontWeight:800,fontSize:16}}>{yr}년 {mo}월 활동</div>
              <span style={tag(me.grade)}>{GN[me.grade]}</span>
            </div>
            {isL&&(<div style={card}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>📝 블로그</div>
              {act.blogs.map((b,i)=>(<div key={i} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                  <label style={lbl}>블로그 {i+1} {i<2&&<span style={{color:"#C0392B"}}>*</span>}</label>
                  {i>=2&&<button onClick={()=>delBlog(i)} style={btn("#FDECEA","#C0392B",true)}>삭제</button>}
                </div>
                <input style={inp} placeholder="블로그 링크 입력" value={b.link} onChange={e=>updBlog(i,e.target.value)}/>
              </div>))}
              <button onClick={addBlog} style={{...btn(BRAND.primaryLight,PC,true),width:"100%"}}>+ 블로그 추가</button>
            </div>)}
            <div style={card}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:14}}>📣 바이럴</div>
              {act.virals.map((v,i)=>(<div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom:i<act.virals.length-1?`1px solid ${BORDER}`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <label style={lbl}>바이럴 {i+1} {i<5&&<span style={{color:"#C0392B"}}>*</span>}</label>
                  {i>=5&&<button onClick={()=>delViral(i)} style={btn("#FDECEA","#C0392B",true)}>삭제</button>}
                </div>
                <input style={inp} placeholder="링크 입력" value={v.link} onChange={e=>updViral(i,"link",e.target.value)}/>
                {photoField(v.photo,val=>updViral(i,"photo",val))}
              </div>))}
              <button onClick={addViral} style={{...btn(BRAND.primaryLight,PC,true),width:"100%"}}>+ 바이럴 추가</button>
            </div>
            <div style={card}>
              <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>📌 기타 <span style={{fontWeight:400,fontSize:12,color:MUTED}}>(선택)</span></div>
              <div style={{fontSize:12,color:MUTED,marginBottom:14}}>링크 또는 사진 중 하나 이상 입력</div>
              {act.extras.length===0&&<div style={{textAlign:"center",color:MUTED,fontSize:13,padding:"10px 0"}}>+ 버튼으로 추가하세요</div>}
              {act.extras.map((e,i)=>(<div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom:i<act.extras.length-1?`1px solid ${BORDER}`:"none"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <label style={lbl}>기타 {i+1}</label>
                  <button onClick={()=>delExtra(i)} style={btn("#FDECEA","#C0392B",true)}>삭제</button>
                </div>
                <input style={inp} placeholder="링크 입력 (선택)" value={e.link||""} onChange={ev=>updExtra(i,"link",ev.target.value)}/>
                {photoField(e.photo,val=>updExtra(i,"photo",val))}
              </div>))}
              <button onClick={addExtra} style={{...btn(BRAND.primaryLight,PC,true),width:"100%"}}>+ 기타 추가</button>
            </div>
            <div style={{position:"sticky",bottom:16}}>
              <button onClick={doSave} disabled={saving} style={{...btn(PC),width:"100%",boxShadow:"0 4px 16px rgba(0,0,0,0.15)",opacity:saving?0.7:1}}>
                {saving?"저장 중...":"💾  저장하기"}
              </button>
              {savMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:PC}}>{savMsg}</div>}
            </div>
          </>)}
          {sp==="inquiry"&&(<>
            <div style={{fontWeight:800,fontSize:16,marginBottom:14}}>💬 관리자 문의</div>
            <div style={card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>새 문의 작성</div>
              <label style={lbl}>제목</label>
              <input style={inp} placeholder="문의 제목을 입력해 주세요" value={iqf.title} onChange={e=>setIqf(f=>({...f,title:e.target.value}))}/>
              <label style={lbl}>내용</label>
              <textarea style={{...inp,minHeight:100,resize:"vertical"}} placeholder="문의 내용을 자세히 적어 주세요" value={iqf.content} onChange={e=>setIqf(f=>({...f,content:e.target.value}))}/>
              <button onClick={sendInquiry} disabled={iqSending} style={{...btn(PC),width:"100%",opacity:iqSending?0.7:1}}>{iqSending?"전송 중...":"📨  문의 전송"}</button>
              {iqMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:PC}}>{iqMsg}</div>}
            </div>
            <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>내 문의 내역 ({myInquiries.length}건)</div>
            {myInquiries.length===0?<div style={{...card,textAlign:"center",color:MUTED,padding:32,fontSize:13}}>아직 문의 내역이 없습니다.</div>
              :myInquiries.map(iq=>(<div key={iq.id} style={{...card,borderLeft:`3px solid ${iq.reply?PC:BORDER}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div style={{fontWeight:700,fontSize:14}}>{iq.title}</div>
                  <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700,background:iq.reply?BRAND.primaryLight:"#F5F5F5",color:iq.reply?PC:MUTED,whiteSpace:"nowrap",marginLeft:8}}>{iq.reply?"답변완료":"답변대기"}</span>
                </div>
                <div style={{fontSize:13,color:MUTED,marginBottom:6,whiteSpace:"pre-wrap"}}>{iq.content}</div>
                <div style={{fontSize:11,color:MUTED}}>{iq.date}</div>
                {iq.reply&&(<div style={{marginTop:12,padding:"10px 14px",background:BRAND.primaryLight,borderRadius:8}}>
                  <div style={{fontSize:11,fontWeight:700,color:PC,marginBottom:4}}>💬 관리자 답변 · {iq.replyDate}</div>
                  <div style={{fontSize:13,whiteSpace:"pre-wrap",lineHeight:1.6}}>{iq.reply}</div>
                </div>)}
              </div>))}
          </>)}
        </div>
      </div>
    );
  }

  if (view==="admin") return (
    <div style={{minHeight:"100vh",background:BG,fontFamily:"'Noto Sans KR',sans-serif",color:TEXT,paddingBottom:60}}>
      <div style={{background:PC,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100}}>
        <Logo dark/><span style={{color:"rgba(255,255,255,0.6)",fontSize:12}}>관리자</span>
        <button onClick={()=>{setView("login");setLf(f=>({...f,code:""}));}} style={btn("rgba(255,255,255,0.15)","#fff",true)}>로그아웃</button>
      </div>
      <div style={{display:"flex",background:CARD,borderBottom:`1px solid ${BORDER}`}}>
        {[["supporters","써포터즈"],["notices","공지사항"],["activities","활동 조회"],["inquiries","문의 관리"]].map(([id,tabName])=>(
          <button key={id} onClick={()=>{setAtab(id);if(id==="inquiries"){setSelInquiry(null);loadAllInquiries();}if(id==="activities")setViewSupp(null);}}
            style={{flex:1,minWidth:60,padding:"12px 6px",border:"none",background:"none",cursor:"pointer",fontWeight:700,fontSize:12,color:atab===id?PC:MUTED,borderBottom:`2px solid ${atab===id?PC:"transparent"}`,whiteSpace:"nowrap"}}>
            {tabName}
          </button>
        ))}
      </div>
      <div style={{...ctr,paddingTop:20}}>
        {atab==="supporters"&&(<>
          <div style={card}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>➕ 써포터즈 등록</div>
            <label style={lbl}>기수</label><input style={inp} placeholder="예: 1기" value={af.gen} onChange={e=>setAf(f=>({...f,gen:e.target.value}))}/>
            <label style={lbl}>닉네임</label><input style={inp} placeholder="닉네임" value={af.nick} onChange={e=>setAf(f=>({...f,nick:e.target.value}))}/>
            <label style={lbl}>전화번호 끝 4자리</label><input style={inp} placeholder="예: 5678" maxLength={4} value={af.phone} onChange={e=>setAf(f=>({...f,phone:e.target.value}))}/>
            <button onClick={addSupporter} style={{...btn("#2C2C2C"),width:"100%"}}>등록하기</button>
            {amsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,color:PC}}>{amsg}</div>}
          </div>
          <div style={card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:15}}>📊 엑셀 일괄 등록</div>
              <button onClick={downloadTemplate} style={btn(BRAND.primaryLight,PC,true)}>📥 양식 다운로드</button>
            </div>
            <div style={{fontSize:12,color:MUTED,marginBottom:10}}>양식: <b>기수 | 닉네임 | 전화번호끝자리</b></div>
            <label style={{display:"block",border:`1.5px dashed ${BORDER}`,borderRadius:8,padding:"14px",textAlign:"center",cursor:"pointer",fontSize:13,color:MUTED,background:"#FAFAFA",marginBottom:8}}>
              📂 엑셀 파일 선택 (.xlsx / .xls)
              <input type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={e=>e.target.files[0]&&handleExcelUpload(e.target.files[0])}/>
            </label>
            {excelErr&&<div style={{color:"#C0392B",fontSize:13,marginBottom:8}}>{excelErr}</div>}
            {excelPreview.length>0&&(<>
              <div style={{fontSize:13,fontWeight:700,marginBottom:8,color:PC}}>미리보기 ({excelPreview.length}명)</div>
              <div style={{maxHeight:160,overflowY:"auto",border:`1px solid ${BORDER}`,borderRadius:8,marginBottom:10}}>
                {excelPreview.map((p,i)=>(<div key={i} style={{padding:"8px 12px",borderBottom:i<excelPreview.length-1?`1px solid ${BORDER}`:"none",fontSize:13,display:"flex",gap:12}}>
                  <span style={{color:MUTED,minWidth:30}}>{i+1}</span><span style={{fontWeight:700}}>{p.gen}</span><span>{p.nick}</span><span style={{color:MUTED}}>{p.phone}</span>
                </div>))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={confirmExcelUpload} style={{...btn(PC),flex:1}}>✅ {excelPreview.length}명 등록 확정</button>
                <button onClick={()=>setExcelPreview([])} style={{...btn("#EEE8E0",TEXT),flex:"0 0 auto"}}>취소</button>
              </div>
            </>)}
          </div>
          <div style={{fontWeight:700,fontSize:15,marginBottom:10}}>써포터즈 목록 ({supps.length}명)</div>
          {supps.length===0?<div style={{...card,textAlign:"center",color:MUTED,padding:32}}>등록된 써포터즈가 없습니다.</div>
            :supps.map(s=>(<div key={s.id} style={{...card,display:"flex",alignItems:"center",gap:10,padding:"12px 16px"}}>
              <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:14}}>{s.gen} · {s.nick}</div><div style={{fontSize:11,color:MUTED}}>끝자리: {s.phone} · {s.joinDate}</div></div>
              <select value={s.grade} onChange={e=>changeGrade(s.id,e.target.value)} style={{border:`1.5px solid ${BORDER}`,borderRadius:6,padding:"4px 8px",fontSize:12,fontWeight:700,color:GC[s.grade],background:GB[s.grade],cursor:"pointer",outline:"none"}}>
                <option value={G.L}>라루피</option><option value={G.S}>라루피시크릿</option>
              </select>
              <button onClick={()=>openSuppActs(s)} style={btn("#EEE8E0",TEXT,true)}>조회</button>
              <button onClick={()=>delSupporter(s.id)} style={btn("#FDECEA","#C0392B",true)}>삭제</button>
            </div>))}
        </>)}
        {atab==="notices"&&(<>
          <div style={card}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>📢 공지사항 등록</div>
            <div style={{display:"flex",background:"#F0EBE4",borderRadius:10,padding:4,marginBottom:14}}>
              {[[G.L,"라루피"],[G.S,"라루피시크릿"]].map(([g,name])=>(
                <button key={g} onClick={()=>setNGrade(g)} style={{flex:1,padding:"8px 0",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,background:nGrade===g?CARD:"transparent",color:nGrade===g?GC[g]:MUTED,boxShadow:nGrade===g?"0 1px 4px rgba(0,0,0,0.1)":"none"}}>{name}</button>
              ))}
            </div>
            <input style={inp} placeholder="제목" value={nf.title} onChange={e=>setNf(f=>({...f,title:e.target.value}))}/>
            <textarea style={{...inp,minHeight:80,resize:"vertical"}} placeholder="내용" value={nf.content} onChange={e=>setNf(f=>({...f,content:e.target.value}))}/>
            <button onClick={saveNotice} style={{...btn("#2C2C2C"),width:"100%"}}>공지 등록</button>
            {nmsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,color:PC}}>{nmsg}</div>}
          </div>
          {[[G.L,nlp],[G.S,nsc]].map(([g,list])=>(<div key={g}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,marginTop:4}}><span style={tag(g)}>{GN[g]}</span><span style={{fontWeight:700}}>공지 ({list.length}건)</span></div>
            {list.length===0&&<div style={{...card,textAlign:"center",color:MUTED,padding:20,fontSize:13}}>등록된 공지가 없습니다.</div>}
            {list.map(n=>(<div key={n.id} style={{...card,padding:"12px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                <div style={{flex:1}}><div style={{fontWeight:700,marginBottom:4}}>{n.title}</div><div style={{fontSize:13,color:MUTED,whiteSpace:"pre-wrap"}}>{n.content}</div><div style={{fontSize:11,color:MUTED,marginTop:6}}>{n.date}</div></div>
                <button onClick={()=>delNotice(g,n.id)} style={btn("#FDECEA","#C0392B",true)}>삭제</button>
              </div>
            </div>))}
          </div>))}
        </>)}
        {atab==="activities"&&(<>
          {!viewSupp?(<>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,flexWrap:"wrap"}}>
              <span style={{fontWeight:700,fontSize:15}}>활동 현황</span>
              <select value={actYear} onChange={e=>{const y=+e.target.value;setActYear(y);loadActSummary(y);}} style={sel}>{YEARS.map(y=><option key={y} value={y}>{y}년</option>)}</select>
              <select value={actMonth} onChange={e=>setActMonth(+e.target.value)} style={sel}>{MONTHS.map(m=><option key={m} value={m}>{m}월</option>)}</select>
              <select value={actGen} onChange={e=>setActGen(e.target.value)} style={sel}>
                <option value="전체">전체 기수</option>
                {[...new Set(supps.map(s=>s.gen))].sort().map(g=><option key={g} value={g}>{g}</option>)}
              </select>
              <button onClick={()=>loadActSummary(actYear)} style={btn("#EEE8E0",TEXT,true)}>새로고침</button>
              <button onClick={downloadActivityExcel} disabled={downloading} style={{...btn(PC,undefined,true),marginLeft:"auto",padding:"6px 14px",opacity:downloading?0.7:1}}>{downloading?"생성 중...":"📥 엑셀 다운로드"}</button>
            </div>
            {supps.length===0&&<div style={{...card,textAlign:"center",color:MUTED,padding:32}}>등록된 써포터즈가 없습니다.</div>}
            {loadingSum&&<div style={{textAlign:"center",padding:20,color:MUTED,fontSize:13}}>불러오는 중...</div>}
            {!loadingSum&&supps.filter(s=>actGen==="전체"||s.gen===actGen).map(s=>{
              const d=(actSummary[s.id]||{})[actMonth], has=!!d&&d.total>0;
              return(<div key={s.id} style={{...card,padding:"14px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14}}>{s.gen} · {s.nick}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3,flexWrap:"wrap"}}>
                      <span style={tag(s.grade)}>{GN[s.grade]}</span>
                      {has?<span style={{fontSize:11,color:PC,fontWeight:700}}>{actYear}년 {actMonth}월 · 총 {d.total}건{d.blogs>0?` · 블로그 ${d.blogs}`:""}{d.virals>0?` · 바이럴 ${d.virals}`:""}{d.extras>0?` · 기타 ${d.extras}`:""}</span>
                        :<span style={{fontSize:11,color:"#BBB"}}>{actYear}년 {actMonth}월 미입력</span>}
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:10,height:10,borderRadius:5,background:has?PC:"#DDD"}}/>
                    <button onClick={()=>openSuppActs(s)} style={btn(BRAND.primaryLight,PC,true)}>상세 조회</button>
                  </div>
                </div>
              </div>);
            })}
          </>):(<>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <button onClick={()=>setViewSupp(null)} style={btn("#EEE8E0",TEXT,true)}>← 목록</button>
              <div><div style={{fontWeight:800}}>{viewSupp.gen} · {viewSupp.nick}</div><span style={tag(viewSupp.grade)}>{GN[viewSupp.grade]}</span></div>
            </div>
            {loadingVA?<div style={{textAlign:"center",padding:40,color:MUTED}}>불러오는 중...</div>
              :viewActs.length===0?<div style={{...card,textAlign:"center",color:MUTED,padding:32}}>등록된 활동 내역이 없습니다.</div>
              :viewActs.map(a=>(<div key={`${a.year}-${a.month}`} style={card}>
                <div style={{fontWeight:800,fontSize:15,marginBottom:12,color:PC}}>{a.year}년 {a.month}월</div>
                {a.blogs&&a.blogs.some(b=>b.link)&&(<div style={{marginBottom:14}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📝 블로그 ({a.blogs.filter(b=>b.link).length}건)</div>
                  {a.blogs.map((b,i)=>b.link&&<div key={i} style={{fontSize:13,marginBottom:6}}>{i+1}. <a href={b.link} target="_blank" rel="noreferrer" style={{color:PC,wordBreak:"break-all"}}>{b.link}</a></div>)}
                </div>)}
                {a.virals&&a.virals.some(v=>v.link||v.photo)&&(<div style={{marginBottom:14}}>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📣 바이럴 ({a.virals.filter(v=>v.link||v.photo).length}건)</div>
                  {a.virals.map((v,i)=>(v.link||v.photo)&&(<div key={i} style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BORDER}`}}>
                    <div style={{fontSize:12,color:MUTED,marginBottom:4}}>바이럴 {i+1}</div>
                    {v.link&&<div style={{fontSize:13,marginBottom:6}}><a href={v.link} target="_blank" rel="noreferrer" style={{color:PC,wordBreak:"break-all"}}>{v.link}</a></div>}
                    {v.photo&&<img src={v.photo} alt="" style={{maxWidth:160,maxHeight:120,borderRadius:8,border:`1px solid ${BORDER}`,objectFit:"cover"}}/>}
                  </div>))}
                </div>)}
                {a.extras&&a.extras.some(e=>e.link||e.photo)&&(<div>
                  <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📌 기타 ({a.extras.filter(e=>e.link||e.photo).length}건)</div>
                  {a.extras.map((e,i)=>(e.link||e.photo)&&(<div key={i} style={{marginBottom:10}}>
                    {e.link&&<div style={{fontSize:13,marginBottom:4}}><a href={e.link} target="_blank" rel="noreferrer" style={{color:PC,wordBreak:"break-all"}}>{e.link}</a></div>}
                    {e.photo&&<img src={e.photo} alt="" style={{maxWidth:160,maxHeight:120,borderRadius:8,border:`1px solid ${BORDER}`,objectFit:"cover"}}/>}
                  </div>))}
                </div>)}
              </div>))}
          </>)}
        </>)}
        {atab==="inquiries"&&(<>
          {!selInquiry?(<>
            <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>💬 전체 문의 ({allInquiries.length}건)
              <button onClick={loadAllInquiries} style={{...btn("#EEE8E0",TEXT,true),marginLeft:10}}>새로고침</button>
            </div>
            {loadingIq?<div style={{textAlign:"center",padding:40,color:MUTED}}>불러오는 중...</div>
              :allInquiries.length===0?<div style={{...card,textAlign:"center",color:MUTED,padding:32}}>문의 내역이 없습니다.</div>
              :allInquiries.map(iq=>(<div key={iq.id} onClick={()=>{setSelInquiry(iq);setReplyText(iq.reply||"");}}
                style={{...card,cursor:"pointer",borderLeft:`3px solid ${iq.reply?PC:"#E0B97A"}`,padding:"12px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                  <div style={{flex:1}}><div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{iq.title}</div><div style={{fontSize:12,color:MUTED}}>{iq.suppName}&nbsp;<span style={tag(iq.grade)}>{GN[iq.grade]}</span></div><div style={{fontSize:11,color:MUTED,marginTop:4}}>{iq.date}</div></div>
                  <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,fontWeight:700,background:iq.reply?BRAND.primaryLight:"#FEF6E4",color:iq.reply?PC:"#B7860B",whiteSpace:"nowrap"}}>{iq.reply?"답변완료":"미답변"}</span>
                </div>
              </div>))}
          </>):(<>
            <button onClick={()=>{setSelInquiry(null);setReplyText("");setReplyMsg("");}} style={{...btn("#EEE8E0",TEXT,true),marginBottom:14}}>← 목록</button>
            <div style={card}>
              <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>{selInquiry.title}</div>
              <div style={{fontSize:12,color:MUTED,marginBottom:12}}>{selInquiry.suppName}&nbsp;<span style={tag(selInquiry.grade)}>{GN[selInquiry.grade]}</span>&nbsp;·&nbsp;{selInquiry.date}</div>
              <div style={{fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap",padding:12,background:"#F9F6F2",borderRadius:8}}>{selInquiry.content}</div>
            </div>
            <div style={card}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>💬 관리자 답변</div>
              <textarea style={{...inp,minHeight:100,resize:"vertical"}} placeholder="답변 내용을 입력해 주세요" value={replyText} onChange={e=>setReplyText(e.target.value)}/>
              <button onClick={sendReply} style={{...btn(PC),width:"100%"}}>답변 등록</button>
              {replyMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:PC}}>{replyMsg}</div>}
            </div>
          </>)}
        </>)}
      </div>
    </div>
  );

  return null;
}
