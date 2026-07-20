import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import {
  Megaphone, Target, PenLine, ShoppingBag, Package, MessageCircle, Rss, Pin, Plus, UserPlus,
  FileSpreadsheet, Users, Gift, ClipboardList, Send, Pencil, CheckCircle2, XCircle, Clock,
  Lock, Unlock, Search, Save, Camera, RotateCw, User, Phone, ShieldCheck, Check, Smartphone,
  Download, Upload, LogOut, X, Trash2, ChevronLeft, ArrowRight, Bell,
} from "lucide-react";
import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs
} from "firebase/firestore";
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
  get: async k => { try { const s = await getDoc(doc(fs, "kv", san(k))); return s.exists() ? JSON.parse(s.data().v) : null; } catch { return null; } },
  set: async (k, v) => { try { await setDoc(doc(fs, "kv", san(k)), { v: JSON.stringify(v), k }); return true; } catch { return false; } },
  list: async p => { try { const q = query(collection(fs, "kv"), where("k", ">=", p), where("k", "<", p + "")); const s = await getDocs(q); return s.docs.map(d => d.data().k); } catch { return []; } }
};
const ADMIN_CODE = "LALUCELL2025";
const G = { L: "laroupi", S: "laroupisecret" };
const GN = { laroupi: "라루피", laroupisecret: "라루피시크릿" };
// Figma "Simple Design System" — Brand color primitives (라루셀 그린 10단계)
const BRAND_SCALE = {
  100: "#F2F6F5", 200: "#D9E3E1", 300: "#B3C8C3", 400: "#80A39C", 500: "#4D7E74",
  600: "#266256", 700: "#0D4F42", 800: "#004638", 900: "#00382D", 1000: "#002A22",
};
const GC = { laroupi: BRAND_SCALE[800], laroupisecret: BRAND_SCALE[600] };
const GB = { laroupi: BRAND_SCALE[200], laroupisecret: BRAND_SCALE[300] };
const YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const LACHAS = [1, 2, 3, 4, 5, 6];
const BRAND = { logoUrl: "/logo.png", logoText: "LALUPPY", primary: BRAND_SCALE[800], primaryLight: BRAND_SCALE[200] };
const BASE_QUOTA = { laroupi: 2, laroupisecret: 1 };
const MISSION_VIRAL_COUNT = 5;
const MISSION_VIRAL_MAX = 100;
const openChaKey = gen => "openCha:laroupi:gen:" + gen;
const missionSettingKey = () => "mission:setting:global";
const missionDataKey = (grade, memberId) => "mission:" + grade + ":" + memberId;
const dmKey = supporterId => "dm:" + supporterId;
function formatDate(d) {
  return d.getFullYear() + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0");
}
async function compressImage(file) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX = 300, q = 0.25;
        let w = img.width, h = img.height;
        if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        const c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        res(c.toDataURL("image/jpeg", q));
      };
      img.src = e.target.result;
    };
    r.readAsDataURL(file);
  });
}
function blankAct(grade) {
  const virals = Array(5).fill(0).map(() => ({ link: "", photo: null }));
  if (grade === G.L) return { blogs: [{ link: "" }, { link: "" }], virals, extras: [], submitted: false };
  return { virals, extras: [], submitted: false };
}
function blankMission() {
  return { virals: Array(MISSION_VIRAL_COUNT).fill(0).map(() => ({ link: "", photo: null })), status: null, rejectedReason: "", submittedAt: null };
}
// Figma Foundations 기준 spacing / radius / typography 스케일
const SP = { 0: 0, 50: 2, 100: 4, 150: 6, 200: 8, 300: 12, 400: 16, 600: 24, 800: 32, 1200: 48 };
const R = { sm: 4, md: 8, lg: 16, full: 9999 };
const FZ = { xs: 12, sm: 14, base: 16, subheading: 20, heading: 24 };
const T = {
  pc: BRAND_SCALE[800], pcHover: BRAND_SCALE[900],
  pcL: BRAND_SCALE[200], pcLHover: BRAND_SCALE[300], pcTertiary: BRAND_SCALE[100],
  pcText: BRAND_SCALE[600],
  bg: "#FAF8F5", card: "#fff",
  border: "#E3DED6", text: "#2C2C2C", muted: "#87867F",
  mission: "#7B3F00", missionL: "#FFF3E0",
};
const S = {
  inp: { width: "100%", padding: "12px 16px", border: "1.5px solid " + T.border, borderRadius: R.md, fontSize: FZ.sm, outline: "none", boxSizing: "border-box", background: "#fff", marginBottom: SP[300], fontFamily: "inherit" },
  btn: (bg, color, sm) => ({ background: bg, color: color || "#fff", border: "none", borderRadius: R.full, padding: sm ? "7px 16px" : "14px 26px", fontSize: sm ? FZ.xs : FZ.sm + 1, fontWeight: 700, letterSpacing: "-0.1px", cursor: "pointer" }),
  card: { background: T.card, borderRadius: R.lg, padding: 20, boxShadow: "0 4px 18px rgba(0,70,56,0.09)", border: "1px solid " + T.border, marginBottom: SP[400] },
  tag: g => ({ display: "inline-block", padding: "4px 14px", borderRadius: R.full, fontSize: 11, fontWeight: 800, letterSpacing: "0.2px", background: GB[g] || "#EEE", color: GC[g] || "#333" }),
  lbl: { fontSize: FZ.xs, fontWeight: 700, color: T.muted, marginBottom: 6, display: "block", letterSpacing: "0.1px" },
  ctr: { maxWidth: 500, margin: "0 auto", padding: "0 " + SP[400] + "px" },
  sel: { border: "1.5px solid " + T.border, borderRadius: R.full, padding: "7px 16px", fontSize: 13, fontWeight: 700, color: T.pc, background: T.pcL, cursor: "pointer", outline: "none" },
  h1: { fontWeight: 800, fontSize: FZ.subheading, letterSpacing: "-0.3px", marginBottom: 18, color: T.text },
  h2: { fontWeight: 800, fontSize: FZ.base, marginBottom: 12, color: T.text },
};
function MissionBadge({ status }) {
  if (!status) return null;
  const map = {
    submitted: { bg: "#FFF8E1", color: "#B8860B", label: "검토 중", Icon: Clock },
    approved:  { bg: "#E8F5E9", color: "#2E7D32", label: "승인완료", Icon: CheckCircle2 },
    rejected:  { bg: "#FDECEA", color: "#C0392B", label: "반려", Icon: XCircle },
  };
  const s = map[status] || {};
  const Ic = s.Icon;
  return <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 999, fontWeight: 800, background: s.bg, color: s.color, display: "inline-flex", alignItems: "center", gap: 4 }}>{Ic && <Ic size={12}/>}{s.label}</span>;
}
function Logo({ dark }) {
  return BRAND.logoUrl
    ? <img src={BRAND.logoUrl} alt="LALUPPY" style={{ height: dark ? 32 : 28, objectFit: "contain", filter: dark ? "brightness(0) invert(1)" : "none" }} />
    : <span style={{ fontWeight: 900, fontSize: 20, color: dark ? "#fff" : T.pc }}>{BRAND.logoText}</span>;
}
function OpenChaListByGen({ gen, refreshKey }) {
  const [list, setList] = useState([]);
  useEffect(() => { if (!gen) return; db.get(openChaKey(gen)).then(d => setList(d || [])); }, [gen, refreshKey]);
  if (!gen) return null;
  if (list.length === 0) return <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>현재 오픈된 차수: 없음</div>;
  return <div style={{ fontSize: 12, color: T.pc, fontWeight: 700, marginBottom: 10 }}>현재 오픈된 차수: {list.map(c => c + "차").join(", ")}</div>;
}
function OpenChaToggleByGen({ cha, gen, refreshKey, onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { if (!gen) return; db.get(openChaKey(gen)).then(d => setIsOpen((d || []).includes(cha))); }, [cha, gen, refreshKey]);
  return (
    <button onClick={async () => { await onToggle(); const d = await db.get(openChaKey(gen)) || []; setIsOpen(d.includes(cha)); }}
      style={{ padding: "10px 18px", borderRadius: 10, border: "2px solid " + (isOpen ? "#C0392B" : T.pc), background: isOpen ? "#FDECEA" : T.pcL, color: isOpen ? "#C0392B" : T.pc, fontWeight: 700, cursor: "pointer", fontSize: 14, minWidth: 60 }}>
      {cha}차 {isOpen ? "🟢 오픈" : "⚫ 클로즈"}
    </button>
  );
}
function OpenMonthList({ grade, refreshKey }) {
  const [list, setList] = useState([]);
  useEffect(() => { db.get("openMonths:" + grade).then(d => setList(d || [])); }, [grade, refreshKey]);
  if (list.length === 0) return <div style={{ fontSize: 12, color: T.muted, padding: "8px 0" }}>오픈된 달이 없습니다.</div>;
  const del = async id => { const next = list.filter(om => om.id !== id); await db.set("openMonths:" + grade, next); setList(next); };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.sort((a, b) => a.year - b.year || a.month - b.month).map(om => (
        <div key={om.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: T.pcL, borderRadius: 8, fontSize: 12, border: "1px solid " + T.border }}>
          <span style={{ fontWeight: 700, color: T.pc }}>{om.year}년 {om.month}월</span>
          <button onClick={() => del(om.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, fontSize: 14, padding: 0, lineHeight: 1 }}>×</button>
        </div>
      ))}
    </div>
  );
}
function EditMemberModal({ supp, onSave, onClose, existingSupps }) {
  const [ef, setEf] = useState({ gen: supp.gen, nick: supp.nick, phone: supp.phone });
  const [emsg, setEmsg] = useState("");
  const [saving, setSaving] = useState(false);
  const doSave = async () => {
    const { gen, nick, phone } = ef;
    if (!gen.trim() || !nick.trim() || !phone.trim()) { setEmsg("모든 항목을 입력해 주세요."); return; }
    if (phone.trim().length !== 4 || isNaN(phone.trim())) { setEmsg("전화번호 끝 4자리를 숫자로 입력해 주세요."); return; }
    if (existingSupps.find(s => s.id !== supp.id && s.gen === gen.trim() && s.nick === nick.trim())) { setEmsg("동일 기수/닉네임이 이미 존재합니다."); return; }
    setSaving(true);
    await onSave(supp.id, { gen: gen.trim(), nick: nick.trim(), phone: phone.trim() });
    setSaving(false);
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 28, maxWidth: 360, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}><Pencil size={16} style={{verticalAlign:-3,marginRight:6}}/>회원정보 수정</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: T.muted, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ background: T.pcL, borderRadius: 10, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: T.pc, fontWeight: 600 }}>
          현재: {supp.gen} · {supp.nick} · 끝자리 {supp.phone}
        </div>
        <label style={S.lbl}>기수 *</label>
        <input style={S.inp} placeholder="예: 1기" value={ef.gen} onChange={e => setEf(f => ({ ...f, gen: e.target.value }))} onKeyDown={e => e.key === "Enter" && doSave()} />
        <label style={S.lbl}>닉네임 *</label>
        <input style={S.inp} placeholder="닉네임" value={ef.nick} onChange={e => setEf(f => ({ ...f, nick: e.target.value }))} onKeyDown={e => e.key === "Enter" && doSave()} />
        <label style={S.lbl}>전화번호 끝 4자리 *</label>
        <input style={S.inp} placeholder="예: 5678" maxLength={4} value={ef.phone} onChange={e => setEf(f => ({ ...f, phone: e.target.value.replace(/\D/g, "") }))} onKeyDown={e => e.key === "Enter" && doSave()} />
        {emsg && <div style={{ color: "#C0392B", fontSize: 13, marginBottom: 10, fontWeight: 600 }}>{emsg}</div>}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button onClick={onClose} style={{ ...S.btn("#EEE8E0", T.text), flex: 1 }}>취소</button>
          <button onClick={doSave} disabled={saving} style={{ ...S.btn(T.pc), flex: 2, opacity: saving ? 0.7 : 1 }}>{saving ? "저장 중..." : "✅ 저장"}</button>
        </div>
      </div>
    </div>
  );
}
function RejectModal({ suppName, onConfirm, onClose }) {
  const [reason, setReason] = useState("");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 28, maxWidth: 360, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 6 }}><XCircle size={16} style={{verticalAlign:-3,marginRight:6}}/>반려 사유 입력</div>
        <div style={{ fontSize: 13, color: T.muted, marginBottom: 16 }}>{suppName}님의 튼특미션을 반려합니다.</div>
        <label style={S.lbl}>반려 사유 *</label>
        <textarea style={{ ...S.inp, minHeight: 80, resize: "vertical" }} placeholder="써포터즈에게 전달될 반려 사유를 입력해 주세요." value={reason} onChange={e => setReason(e.target.value)} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ ...S.btn("#EEE8E0", T.text), flex: 1 }}>취소</button>
          <button onClick={() => { if (!reason.trim()) return; onConfirm(reason.trim()); }} style={{ ...S.btn("#C0392B"), flex: 2 }}>반려 확정</button>
        </div>
      </div>
    </div>
  );
}
function MissionTargetPicker({ setting, setSetting, supps }) {
  const [q, setQ] = useState("");
  const targetIds = setting.targetIds || [];
  const toggle = id => setSetting(s => {
    const cur = s.targetIds || [];
    const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id];
    return { ...s, targetIds: next };
  });
  const selected = supps.filter(s => targetIds.includes(s.id));
  const qq = q.trim().toLowerCase();
  const matches = qq
    ? supps.filter(s => !targetIds.includes(s.id) && (s.nick.toLowerCase().includes(qq) || s.gen.toLowerCase().includes(qq))).slice(0, 6)
    : [];
  return (
    <div style={{ background: "#FAFAFA", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 8 }}>선택된 회원 ({selected.length}명)</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {selected.length === 0 && <span style={{ fontSize: 12, color: "#BBB" }}>선택된 회원이 없습니다.</span>}
        {selected.map(s => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", background: T.missionL, borderRadius: 20, fontSize: 12, border: "1px solid " + T.mission, color: T.mission }}>
            {s.gen} · {s.nick} <span style={{ opacity: 0.7 }}>({GN[s.grade]})</span>
            <button onClick={() => toggle(s.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.mission, fontSize: 13, padding: 0, lineHeight: 1 }}>×</button>
          </div>
        ))}
      </div>
      <input style={{ ...S.inp, marginBottom: 6 }} placeholder="기수 또는 닉네임으로 검색해 추가 (전체 회원 대상)" value={q} onChange={e => setQ(e.target.value)} />
      {matches.map(s => (
        <div key={s.id} onClick={() => toggle(s.id)} style={{ padding: "7px 10px", borderRadius: 8, cursor: "pointer", fontSize: 13, background: "#fff", border: "1px solid " + T.border, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
          <span>{s.gen} · {s.nick}</span><span style={S.tag(s.grade)}>{GN[s.grade]}</span>
        </div>
      ))}
      {qq && matches.length === 0 && <div style={{ fontSize: 12, color: T.muted, padding: "4px 0" }}>검색 결과가 없습니다.</div>}
    </div>
  );
}
function DmPopupModal({ thread, onReply, onClose, sending }) {
  const [text, setText] = useState("");
  const last = thread.messages[thread.messages.length - 1];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 28, maxWidth: 380, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}><Send size={16} style={{verticalAlign:-3,marginRight:6}}/>관리자 메시지</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: T.muted, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ background: T.pcL, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{thread.title}</div>
          <div style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{last.text}</div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 8 }}>{last.date}</div>
        </div>
        <label style={S.lbl}>답장하기</label>
        <textarea style={{ ...S.inp, minHeight: 80, resize: "vertical" }} placeholder="답장을 입력해 주세요." value={text} onChange={e => setText(e.target.value)} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ ...S.btn("#EEE8E0", T.text), flex: 1 }}>닫기</button>
          <button onClick={() => text.trim() && onReply(text.trim())} disabled={sending} style={{ ...S.btn(T.pc), flex: 2, opacity: sending ? 0.7 : 1 }}>{sending ? "전송 중..." : "✅ 답장 보내기"}</button>
        </div>
      </div>
    </div>
  );
}
function InquiryReplyPopupModal({ iq, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 28, maxWidth: 380, width: "100%", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}><MessageCircle size={16} style={{verticalAlign:-3,marginRight:6}}/>문의 답변 도착</div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: T.muted, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ fontSize: 12, color: T.muted, marginBottom: 6, fontWeight: 700 }}>내가 보낸 문의</div>
        <div style={{ background: "#F9F6F2", borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{iq.title}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap", color: T.muted }}>{iq.content}</div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 8 }}>{iq.date}</div>
        </div>
        <div style={{ fontSize: 12, color: T.pc, marginBottom: 6, fontWeight: 700 }}>관리자 답변</div>
        <div style={{ background: T.pcL, borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{iq.reply}</div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 8 }}>{iq.replyDate}</div>
        </div>
        <button onClick={onClose} style={{ ...S.btn(T.pc), width: "100%" }}>확인</button>
      </div>
    </div>
  );
}
export default function App() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(s);
  }, []);
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const h = () => window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", h);
    return () => window.removeEventListener("popstate", h);
  }, []);
  useEffect(() => {
    const saved = sessionStorage.getItem("laluppy_user");
    const savedView = sessionStorage.getItem("laluppy_view");
    if (saved && savedView) { setMe(JSON.parse(saved)); setView(savedView); }
    const savedId = localStorage.getItem("laluppy_savedId");
    if (savedId) {
      try { const { gen, nick, phone } = JSON.parse(savedId); setLf(f => ({ ...f, gen: gen || "", nick: nick || "", phone: phone || "" })); setSaveId(true); } catch {}
    }
  }, []);
  const [view, setView] = useState("login");
  const [adminMode, setAdminMode] = useState(false);
  const [lf, setLf] = useState({ gen: "", nick: "", phone: "", code: "" });
  const [saveId, setSaveId] = useState(false);
  const [lerr, setLerr] = useState("");
  const [me, setMe] = useState(null);
  const [sp, setSp] = useState("notices");
  const [myNotices, setMyNotices] = useState([]);
  const [savedMonths, setSavedMonths] = useState([]);
  const [openMonthsList, setOpenMonthsList] = useState([]);
  const [openChaList, setOpenChaList] = useState([]);
  const [yr, setYr] = useState(new Date().getFullYear());
  const [mo, setMo] = useState(new Date().getMonth() + 1);
  const [selectedActCha, setSelectedActCha] = useState(1);
  const [savedChas, setSavedChas] = useState([]);
  const [act, setAct] = useState(null);
  const [savMsg, setSavMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [myInquiries, setMyInquiries] = useState([]);
  const [iqf, setIqf] = useState({ title: "", content: "" });
  const [iqMsg, setIqMsg] = useState("");
  const [iqSending, setIqSending] = useState(false);
  const [myAddress, setMyAddress] = useState({ name: "", phone: "", zonecode: "", address: "", addressDetail: "" });
  const [addrMsg, setAddrMsg] = useState("");
  const [addrSaving, setAddrSaving] = useState(false);
  const [addrEditMode, setAddrEditMode] = useState(false);
  const [selectedCha, setSelectedCha] = useState(1);
  const [selYr, setSelYr] = useState(new Date().getFullYear());
  const [selMo, setSelMo] = useState(new Date().getMonth() + 1);
  const [availableProds, setAvailableProds] = useState([]);
  const [mySelections, setMySelections] = useState([]);
  const [selMsg, setSelMsg] = useState("");
  const [canSelectProduct, setCanSelectProduct] = useState(false);
  const [canSelectReason, setCanSelectReason] = useState("");
  const [selConfirmProd, setSelConfirmProd] = useState(null);
  const [myQuota, setMyQuota] = useState(BASE_QUOTA[G.L]);
  // 튼특미션 (써포터즈)
  const [myMission, setMyMission] = useState(null);
  const [missionSetting, setMissionSetting] = useState(null);
  const [missionSaving, setMissionSaving] = useState(false);
  const [missionMsg, setMissionMsg] = useState("");
  // 관리자 메시지 (DM) - 써포터즈 측
  const [myDms, setMyDms] = useState([]);
  const [popupDm, setPopupDm] = useState(null);
  const [popupIq, setPopupIq] = useState(null);
  const [dmReplyDrafts, setDmReplyDrafts] = useState({});
  const [dmReplySendingId, setDmReplySendingId] = useState(null);
  const [atab, setAtab] = useState("supporters");
  const [supps, setSupps] = useState([]);
  const [nlp, setNlp] = useState([]);
  const [nsc, setNsc] = useState([]);
  const [nGrade, setNGrade] = useState(G.L);
  const [nf, setNf] = useState({ title: "", content: "" });
  const [nmsg, setNmsg] = useState("");
  const [af, setAf] = useState({ gen: "", nick: "", phone: "" });
  const [amsg, setAmsg] = useState("");
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelected, setBulkSelected] = useState(new Set());
  const [bulkTargetGrade, setBulkTargetGrade] = useState(G.S);
  const [bulkMsg, setBulkMsg] = useState("");
  const [bulkSaving, setBulkSaving] = useState(false);
  const [viewSupp, setViewSupp] = useState(null);
  const [viewActs, setViewActs] = useState([]);
  const [loadingVA, setLoadingVA] = useState(false);
  const [actYear, setActYear] = useState(new Date().getFullYear());
  const [actMonth, setActMonth] = useState(new Date().getMonth() + 1);
  const [actGen, setActGen] = useState("전체");
  const [actGrade, setActGrade] = useState("전체");
  const [actStatusFilter, setActStatusFilter] = useState("all");
  const [actSummary, setActSummary] = useState({});
  const [loadingSum, setLoadingSum] = useState(false);
  const [allInquiries, setAllInquiries] = useState([]);
  const [selInquiry, setSelInquiry] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyMsg, setReplyMsg] = useState("");
  const [loadingIq, setLoadingIq] = useState(false);
  const [prodGrade, setProdGrade] = useState(G.L);
  const [prodYear, setProdYear] = useState(new Date().getFullYear());
  const [prodMonth, setProdMonth] = useState(new Date().getMonth() + 1);
  const [prodCha, setProdCha] = useState(1);
  const [prodList, setProdList] = useState([]);
  const [newProd, setNewProd] = useState({ name: "", code: "" });
  const [prodMsg, setProdMsg] = useState("");
  const [newOpenMonth, setNewOpenMonth] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2 });
  const [openRefresh, setOpenRefresh] = useState(0);
  const [prodGen, setProdGen] = useState("");
  // 튼특미션 설정 (관리자) - 라루피/시크릿 공통(통합)
  const [missionSettingForm, setMissionSettingForm] = useState({ isOpen: false, deadline: "", prodName: "튼특크림", targetMode: "all", targetIds: [] });
  const [missionExcelPreview, setMissionExcelPreview] = useState([]);
  const [missionExcelErr, setMissionExcelErr] = useState("");
  const [missionSettingMsg, setMissionSettingMsg] = useState("");
  const [missionSubTab, setMissionSubTab] = useState("all");
  const [allMissions, setAllMissions] = useState([]);
  const [loadingMissions, setLoadingMissions] = useState(false);
  const [missionGradeFilter, setMissionGradeFilter] = useState("전체");
  const [rejectTarget, setRejectTarget] = useState(null);
  const [missionActionMsg, setMissionActionMsg] = useState("");
  // 관리자 → 회원 메시지 (DM) - 관리자 측
  const [iqSubTab, setIqSubTab] = useState("received");
  const [dmSuppSearch, setDmSuppSearch] = useState("");
  const [dmSuppTarget, setDmSuppTarget] = useState(null);
  const [dmForm, setDmForm] = useState({ title: "", content: "" });
  const [dmSendMsg, setDmSendMsg] = useState("");
  const [dmSendSaving, setDmSendSaving] = useState(false);
  const [allDmThreads, setAllDmThreads] = useState([]);
  const [loadingDmThreads, setLoadingDmThreads] = useState(false);
  const [selDmThread, setSelDmThread] = useState(null);
  const [dmAdminReplyText, setDmAdminReplyText] = useState("");
  const [dmAdminReplyMsg, setDmAdminReplyMsg] = useState("");
  const [excelPreview, setExcelPreview] = useState([]);
  const [excelErr, setExcelErr] = useState("");
  const [downloadingAct, setDownloadingAct] = useState(false);
  const [downloadingSel, setDownloadingSel] = useState(false);
  const [loadingPrevProd, setLoadingPrevProd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [editMsg, setEditMsg] = useState("");
  const [suppSearch, setSuppSearch] = useState("");
  const [suppSearchGrade, setSuppSearchGrade] = useState("전체");
  const [extraQuotaList, setExtraQuotaList] = useState([]);
  const [extraQuotaSearch, setExtraQuotaSearch] = useState("");
  const [loadingEQ, setLoadingEQ] = useState(false);
  const extraQuotaKey = (grade, cha, year, month) =>
    grade === G.L ? "extraQuota:laroupi:cha:" + cha : "extraQuota:" + grade + ":" + year + ":" + month;
  const loadExtraQuota = async () => {
    setLoadingEQ(true);
    const key = extraQuotaKey(prodGrade, prodCha, prodYear, prodMonth);
    const data = await db.get(key) || {};
    const list = Object.entries(data).map(([suppId, extraCount]) => {
      const supp = supps.find(s => s.id === suppId);
      return { suppId, extraCount, suppName: supp ? supp.gen + " · " + supp.nick : suppId, grade: supp?.grade || "" };
    });
    setExtraQuotaList(list);
    setLoadingEQ(false);
  };
  const saveExtraQuota = async (suppId, extraCount) => {
    const key = extraQuotaKey(prodGrade, prodCha, prodYear, prodMonth);
    const data = await db.get(key) || {};
    if (extraCount <= 0) delete data[suppId]; else data[suppId] = extraCount;
    await db.set(key, data);
    await loadExtraQuota();
  };
  const loadMyQuota = async () => {
    if (!me) return;
    const base = BASE_QUOTA[me.grade] || 1;
    let extraKey;
    if (me.grade === G.L) extraKey = "extraQuota:laroupi:cha:" + selectedCha;
    else extraKey = "extraQuota:" + me.grade + ":" + selYr + ":" + selMo;
    const data = await db.get(extraKey) || {};
    const missionExtra = await db.get("extraQuota:mission:" + me.grade + ":" + me.id) || 0;
    setMyQuota(base + (data[me.id] || 0) + missionExtra);
  };
  useEffect(() => {
    if (view === "admin") {
      db.get("supporters").then(d => { const l = d || []; setSupps(l); loadActSummary(actYear, l); });
      Promise.all([db.get("notices:laroupi"), db.get("notices:laroupisecret")]).then(([lp, sc]) => { setNlp(lp || []); setNsc(sc || []); });
      db.get(missionSettingKey()).then(ms => {
        if (ms) setMissionSettingForm({ targetMode: "all", targetIds: [], ...ms });
      });
    }
  }, [view]);
  useEffect(() => {
    if (me) {
      Promise.all([
        db.get("notices:" + me.grade),
        db.get("address:" + me.id),
        me.grade === G.L ? db.get(openChaKey(me.gen)) : db.get("openMonths:" + me.grade),
        db.get(missionSettingKey(me.grade)),
        db.get(missionDataKey(me.grade, me.id)),
        db.get(dmKey(me.id)),
      ]).then(([notices, addr, openData, mSetting, mData, dmList]) => {
        setMyNotices(notices || []);
        if (addr) setMyAddress(addr);
        if (me.grade === G.L) setOpenChaList(openData || []);
        else setOpenMonthsList(openData || []);
        setMissionSetting(mSetting ? { targetMode: "all", targetIds: [], ...mSetting } : null);
        setMyMission(mData || null);
        const dms = dmList || [];
        setMyDms(dms);
        const unread = dms.find(d => d.messages && d.messages.length && d.messages[d.messages.length - 1].from === "admin" && !d.supporterRead);
        if (unread) setPopupDm(unread);
      });
      loadMySaved(me.id);
      loadMyInquiries(me.id);
    }
  }, [me]);
  useEffect(() => {
    if (me && sp === "product") {
      Promise.all([loadAvailableProds(), loadMySelections(), loadCanSelect(), loadMyQuota()]);
    }
  }, [me, sp, selectedCha, selYr, selMo]);
  useEffect(() => {
    if (sp === "inquiry" && me && myDms.some(d => d.messages?.length && d.messages[d.messages.length - 1].from === "admin" && !d.supporterRead)) {
      (async () => {
        const dms = await db.get(dmKey(me.id)) || [];
        const next = dms.map(d => (d.messages?.length && d.messages[d.messages.length - 1].from === "admin" && !d.supporterRead) ? { ...d, supporterRead: true } : d);
        await db.set(dmKey(me.id), next);
        setMyDms(next);
      })();
    }
    if (sp === "inquiry" && me && myInquiries.some(iq => iq.reply && iq.replyRead === false)) {
      (async () => {
        const iqs = await db.get("inquiries:" + me.id) || [];
        const next = iqs.map(iq => (iq.reply && iq.replyRead === false) ? { ...iq, replyRead: true } : iq);
        await db.set("inquiries:" + me.id, next);
        setMyInquiries(next);
      })();
    }
  }, [sp]);
  useEffect(() => {
    if (atab === "products" && view === "admin") { loadAdminProds(); loadExtraQuota(); }
  }, [atab, prodGrade, prodYear, prodMonth, prodCha]);
  useEffect(() => {
    if (atab === "products" && view === "admin" && supps.length > 0) loadExtraQuota();
  }, [prodGrade, prodCha, prodYear, prodMonth, supps.length]);
  const loadMySaved = async uid => {
    if (me?.grade === G.L) {
      const keys = await db.list("activity:" + uid + ":cha:");
      setSavedChas(keys.map(k => +k.split(":cha:")[1]).filter(n => !isNaN(n)));
    } else {
      const keys = await db.list("activity:" + uid + ":");
      setSavedMonths(keys.map(k => { const p = k.split(":"); return { year: +p[2], month: +p[3] }; }).sort((a, b) => b.year - a.year || b.month - a.month));
    }
  };
  const selectCha = async cha => {
    if (!openChaList.includes(cha)) return;
    setSelectedActCha(cha);
    const saved = await db.get("activity:" + me.id + ":cha:" + cha);
    setAct(saved || blankAct(me.grade)); setSp("activity");
  };
  const loadMyInquiries = async uid => {
    const list = await db.get("inquiries:" + uid) || [];
    setMyInquiries(list);
    const unreadReply = list.find(iq => iq.reply && iq.replyRead === false);
    if (unreadReply) setPopupIq(unreadReply);
  };
  const closeIqPopup = async () => {
    if (!popupIq || !me) return;
    const iqs = await db.get("inquiries:" + me.id) || [];
    const next = iqs.map(iq => iq.id === popupIq.id ? { ...iq, replyRead: true } : iq);
    await db.set("inquiries:" + me.id, next);
    setMyInquiries(next);
    setPopupIq(null);
  };
  const loadAvailableProds = async () => {
    if (!me) return;
    if (me.grade === G.L) setAvailableProds(await db.get("products:laroupi:cha:" + selectedCha) || []);
    else setAvailableProds(await db.get("products:" + me.grade + ":" + selYr + ":" + selMo) || []);
  };
  const loadMySelections = async () => {
    if (!me) return;
    if (me.grade === G.L) {
      const keys = await db.list("selection:" + me.id + ":cha:" + selectedCha + ":slot:");
      const list = await Promise.all(keys.map(k => db.get(k)));
      setMySelections(list.filter(Boolean));
    } else {
      const keys = await db.list("selection:" + me.id + ":" + selYr + ":" + selMo + ":slot:");
      const list = await Promise.all(keys.map(k => db.get(k)));
      setMySelections(list.filter(Boolean));
    }
  };
  useEffect(() => { if (me && me.grade === G.S && sp === "product") setMySelections([]); }, [selYr, selMo]);
  useEffect(() => { if (me && me.grade === G.L && sp === "product") setMySelections([]); }, [selectedCha]);
  const loadAdminProds = async () => {
    if (prodGrade === G.L) setProdList(await db.get("products:laroupi:cha:" + prodCha) || []);
    else setProdList(await db.get("products:" + prodGrade + ":" + prodYear + ":" + prodMonth) || []);
  };
  const loadCanSelect = async () => {
    if (!me) return;
    if (me.grade === G.L) {
      if (selectedCha === 1) { setCanSelectProduct(true); setCanSelectReason(""); return; }
      const prevAct = await db.get("activity:" + me.id + ":cha:" + (selectedCha - 1));
      if (!prevAct || prevAct.submitted) { setCanSelectProduct(true); setCanSelectReason(""); }
      else { setCanSelectProduct(false); setCanSelectReason((selectedCha - 1) + "차 활동을 먼저 제출해 주세요."); }
    } else {
      const keys = await db.list("selection:" + me.id + ":");
      const filtered = keys.filter(k => !k.includes(":slot:"));
      if (filtered.length === 0) { setCanSelectProduct(true); setCanSelectReason(""); return; }
      const sels = (await Promise.all(filtered.map(k => db.get(k)))).filter(Boolean);
      sels.sort((a, b) => b.year - a.year || b.month - a.month);
      const last = sels[0];
      const lastAct = last ? await db.get("activity:" + me.id + ":" + last.year + ":" + last.month) : null;
      if (lastAct?.submitted) { setCanSelectProduct(true); setCanSelectReason(""); }
      else { setCanSelectProduct(false); setCanSelectReason(last.year + "년 " + last.month + "월 활동을 먼저 제출해 주세요."); }
    }
  };
  const isMonthAccessible = (year, month) => {
    const now = new Date(); const curY = now.getFullYear(); const curM = now.getMonth() + 1;
    if (year < curY || (year === curY && month <= curM)) return true;
    return openMonthsList.some(om => om.year === year && om.month === month);
  };
  const loadActSummary = async (year, suppList) => {
    const list = suppList !== undefined ? suppList : supps;
    if (!list.length) return;
    setLoadingSum(true);
    const entries = await Promise.all(list.map(async s => {
      // 라루피(L)는 "activity:{id}:cha:{cha}", 라루피시크릿(S)은 "activity:{id}:{year}:{month}" 형식으로 저장되므로
      // 등급을 미리 구분하지 않고 해당 회원의 모든 activity 키를 가져온 뒤 형식별로 분류한다.
      const keys = await db.list("activity:" + s.id + ":");
      const acts = await Promise.all(keys.map(k => db.get(k)));
      const monthData = {}, chaData = {};
      acts.forEach((d, i) => {
        if (!d) return;
        const parts = keys[i].split(":");
        const bc = (d.blogs || []).filter(b => b.link).length;
        const vc = (d.virals || []).filter(v => v.link || v.photo).length;
        const ec = (d.extras || []).filter(e => e.link || e.photo).length;
        const entry = { blogs: bc, virals: vc, extras: ec, total: bc + vc + ec, submitted: d.submitted || false };
        if (parts[2] === "cha") {
          chaData[+parts[3]] = entry;
        } else {
          const y = +parts[2], m = +parts[3];
          if (y === year) monthData[m] = entry;
        }
      });
      return [s.id, { month: monthData, cha: chaData }];
    }));
    setActSummary(Object.fromEntries(entries));
    setLoadingSum(false);
  };
  // 튼특미션: 관리자 설정 저장
  const saveMissionSetting = async () => {
    const ok = await db.set(missionSettingKey(), missionSettingForm);
    setMissionSettingMsg(ok ? "✅ 미션 설정 저장 완료!" : "저장 실패");
    setTimeout(() => setMissionSettingMsg(""), 2500);
  };
  // 튼특미션 대상자: 엑셀 양식 다운로드
  const downloadMissionTargetTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([["기수", "닉네임"], ["1기", "예시닉네임"]]);
    ws["!cols"] = [{ wch: 8 }, { wch: 12 }];
    XLSX.utils.book_append_sheet(wb, ws, "미션대상자");
    XLSX.writeFile(wb, "튼특미션_대상자_양식.xlsx");
  };
  // 튼특미션 대상자: 엑셀 업로드로 회원 매칭
  const handleMissionExcelUpload = async file => {
    setMissionExcelErr(""); setMissionExcelPreview([]);
    try {
      const ab = await file.arrayBuffer(); const wb = XLSX.read(ab, { type: "array" }); const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "", raw: false });
      if (!rows.length) { setMissionExcelErr("시트에서 데이터를 찾지 못했습니다. (빈 파일이거나 첫 시트가 비어있습니다)"); return; }
      const parsed = rows
        .map(r => ({ gen: String(r[0] ?? "").trim(), nick: String(r[1] ?? "").trim() }))
        // 헤더 행("기수"/"닉네임" 텍스트 그대로인 행)과 완전히 빈 행은 제외
        .filter(r => r.gen && r.nick && r.gen !== "기수" && r.nick !== "닉네임")
        .map(r => {
          const found = supps.find(s => s.gen === r.gen && s.nick === r.nick);
          return { ...r, suppId: found ? found.id : null, grade: found ? found.grade : null };
        });
      if (!parsed.length) {
        setMissionExcelErr("유효한 데이터가 없습니다. 엑셀의 A열=기수, B열=닉네임 형식인지 확인해 주세요. (읽은 행 수: " + rows.length + ")");
        return;
      }
      setMissionExcelPreview(parsed);
    } catch (e) { setMissionExcelErr("파일을 읽을 수 없습니다. (" + (e?.message || "알 수 없는 오류") + ")"); }
  };
  // 튼특미션 대상자: 엑셀 매칭 결과를 targetIds에 반영
  const applyMissionExcelTargets = () => {
    const matchedIds = missionExcelPreview.filter(p => p.suppId).map(p => p.suppId);
    setMissionSettingForm(s => {
      const cur = new Set(s.targetIds || []);
      matchedIds.forEach(id => cur.add(id));
      return { ...s, targetIds: [...cur] };
    });
    setMissionExcelPreview([]);
  };
  // 튼특미션: 전체 현황 로드 (관리자)
  const loadAllMissions = async () => {
    setLoadingMissions(true);
    const list = await db.get("supporters") || [];
    const results = await Promise.all(list.map(async s => {
      const data = await db.get(missionDataKey(s.grade, s.id));
      if (!data || !data.status) return null;
      return { ...data, suppId: s.id, suppName: s.gen + " · " + s.nick, grade: s.grade, gen: s.gen };
    }));
    setAllMissions(results.filter(Boolean));
    setLoadingMissions(false);
  };
  // 튼특미션: 승인
  const approveMission = async (item) => {
    if (item.status === "approved") return;
    const updated = { ...item, status: "approved", rejectedReason: "" };
    delete updated.suppId; delete updated.suppName; delete updated.grade; delete updated.gen;
    await db.set(missionDataKey(item.grade || supps.find(s=>s.id===item.suppId)?.grade, item.suppId), updated);
    setAllMissions(prev => prev.map(m => m.suppId === item.suppId ? { ...m, status: "approved", rejectedReason: "" } : m));
    setMissionActionMsg("✅ " + item.suppName + " 승인 완료!");
    setTimeout(() => setMissionActionMsg(""), 2500);
  };
  // 튼특미션: 반려
  const rejectMission = async (item, reason) => {
    const supp = supps.find(s => s.id === item.suppId);
    if (!supp) return;
    const updated = { ...item, status: "rejected", rejectedReason: reason };
    delete updated.suppId; delete updated.suppName; delete updated.grade; delete updated.gen;
    await db.set(missionDataKey(supp.grade, supp.id), updated);
    const cur = await db.get("extraQuota:mission:" + supp.grade + ":" + supp.id) || 0;
    await db.set("extraQuota:mission:" + supp.grade + ":" + supp.id, Math.max(0, cur - 1));
    setRejectTarget(null);
    setAllMissions(prev => prev.map(m => m.suppId === item.suppId ? { ...m, status: "rejected", rejectedReason: reason } : m));
    setMissionActionMsg("❌ " + item.suppName + " 반려 처리 완료!");
    setTimeout(() => setMissionActionMsg(""), 2500);
  };
  // 튼특미션: 임시저장
  const saveMissionDraft = async () => {
    const cur = myMission || blankMission();
    setMissionSaving(true);
    const ok = await db.set(missionDataKey(me.grade, me.id), { ...cur, status: cur.status || null });
    setMissionMsg(ok ? "💾 임시저장 완료! ✓" : "저장에 실패했습니다.");
    setTimeout(() => setMissionMsg(""), 2500);
    setMissionSaving(false);
  };
  // 튼특미션: 써포터즈 제출
  const submitMission = async () => {
    const cur = myMission || blankMission();
    const filled = cur.virals.filter(v => v.link || v.photo);
    if (filled.length < MISSION_VIRAL_COUNT) {
      setMissionMsg("⚠️ 바이럴 " + MISSION_VIRAL_COUNT + "건을 모두 입력해 주세요. (현재 " + filled.length + "건)");
      setTimeout(() => setMissionMsg(""), 3000); return;
    }
    const missingPhoto = cur.virals.findIndex(v => (v.link || v.photo) && !v.photo);
    if (missingPhoto !== -1) { setMissionMsg("⚠️ 바이럴 " + (missingPhoto + 1) + "번 사진이 없습니다."); setTimeout(() => setMissionMsg(""), 3000); return; }
    setMissionSaving(true);
    const wasRejected = cur.status === "rejected";
    const isFirst = !cur.status;
    const updated = { ...cur, status: "submitted", submittedAt: new Date().toLocaleDateString("ko-KR"), rejectedReason: "" };
    const ok = await db.set(missionDataKey(me.grade, me.id), updated);
    if (ok) {
      if (wasRejected || isFirst) {
        const prev = await db.get("extraQuota:mission:" + me.grade + ":" + me.id) || 0;
        await db.set("extraQuota:mission:" + me.grade + ":" + me.id, prev + 1);
      }
      setMyMission(updated);
      setMissionMsg("✅ 튼특미션 제출 완료! 관리자 검토 후 확정됩니다.");
    } else setMissionMsg("저장에 실패했습니다.");
    setMissionSaving(false);
    setTimeout(() => setMissionMsg(""), 4000);
  };
  const updMissionViral = (i, f, v) => {
    setMyMission(m => {
      const base = m || blankMission();
      return { ...base, virals: base.virals.map((x, j) => j === i ? { ...x, [f]: v } : x) };
    });
  };
  // 튼특미션 바이럴 삭제
  const delMissionViral = i => {
    setMyMission(m => {
      const base = m || blankMission();
      return { ...base, virals: base.virals.filter((_, j) => j !== i) };
    });
  };
  // 튼특미션 바이럴 추가
  const addMissionViral = () => {
    setMyMission(m => {
      const base = m || blankMission();
      return { ...base, virals: [...base.virals, { link: "", photo: null }] };
    });
  };
  // 관리자 메시지(DM) - 써포터즈 측 함수
  const appendDmMessage = async (threadId, text) => {
    const dms = await db.get(dmKey(me.id)) || [];
    const now = Date.now();
    const next = dms.map(d => d.id === threadId
      ? { ...d, messages: [...d.messages, { from: "supporter", text, date: new Date().toLocaleString("ko-KR") }], supporterRead: true, adminRead: false, updatedAt: now }
      : d);
    const ok = await db.set(dmKey(me.id), next);
    if (ok) setMyDms(next);
    return ok ? next : dms;
  };
  const openNextUnreadDm = (dms) => {
    const unread = dms.find(d => d.messages?.length && d.messages[d.messages.length - 1].from === "admin" && !d.supporterRead);
    setPopupDm(unread || null);
  };
  const sendDmReply = async (threadId, text) => {
    if (!text || !text.trim()) return;
    setDmReplySendingId(threadId);
    const next = await appendDmMessage(threadId, text.trim());
    setDmReplyDrafts(prev => ({ ...prev, [threadId]: "" }));
    setDmReplySendingId(null);
    if (popupDm && popupDm.id === threadId) openNextUnreadDm(next);
  };
  const closeDmPopup = async () => {
    if (!popupDm) return;
    const dms = await db.get(dmKey(me.id)) || [];
    const next = dms.map(d => d.id === popupDm.id ? { ...d, supporterRead: true } : d);
    await db.set(dmKey(me.id), next);
    setMyDms(next);
    openNextUnreadDm(next);
  };
  const replyDmFromPopup = text => { if (popupDm) sendDmReply(popupDm.id, text); };
  const doLogin = async () => {
    if (adminMode) {
      if (lf.code === ADMIN_CODE) { setView("admin"); setLerr(""); sessionStorage.setItem("laluppy_view", "admin"); }
      else setLerr("관리자 코드가 올바르지 않습니다.");
      return;
    }
    if (!lf.gen || !lf.nick || !lf.phone) { setLerr("모든 항목을 입력해 주세요."); return; }
    const list = await db.get("supporters") || [];
    const found = list.find(s => s.gen === lf.gen.trim() && s.nick === lf.nick.trim() && s.phone === lf.phone.trim());
    if (found) {
      if (saveId) localStorage.setItem("laluppy_savedId", JSON.stringify({ gen: lf.gen.trim(), nick: lf.nick.trim(), phone: lf.phone.trim() }));
      else localStorage.removeItem("laluppy_savedId");
      setMe(found); setView("supporter"); setLerr(""); setSp("notices");
      sessionStorage.setItem("laluppy_user", JSON.stringify(found));
      sessionStorage.setItem("laluppy_view", "supporter");
    } else setLerr("일치하는 정보를 찾을 수 없습니다. 관리자에게 문의해 주세요.");
  };
  const selectMonth = async (year, month) => {
    if (!isMonthAccessible(year, month)) return;
    setYr(year); setMo(month);
    const saved = await db.get("activity:" + me.id + ":" + year + ":" + month);
    setAct(saved || blankAct(me.grade)); setSp("activity");
  };
  const doSave = async (submit = false) => {
    if (uploadingCount > 0) { setSavMsg("⏳ 사진 압축 중입니다. 잠시 후 다시 시도해 주세요."); setTimeout(() => setSavMsg(""), 3000); return; }
    const isL = me.grade === G.L;
    if (submit) {
      const missingIdx = act.virals.findIndex(v => (v.link || v.photo) && !v.photo);
      if (missingIdx !== -1) { setSavMsg("⚠️ 바이럴 " + (missingIdx + 1) + "번 사진이 없습니다."); setTimeout(() => setSavMsg(""), 3000); return; }
    }
    setSaving(true);
    const data = { ...act, ...(isL ? { cha: selectedActCha } : { year: yr, month: mo }), submitted: submit ? true : (act.submitted || false) };
    const key = isL ? "activity:" + me.id + ":cha:" + selectedActCha : "activity:" + me.id + ":" + yr + ":" + mo;
    const ok = await db.set(key, data);
    if (ok) { setAct(data); loadMySaved(me.id); }
    setSavMsg(ok ? (submit ? "✅ 최종 제출 완료!" : "저장 완료! ✓") : "저장에 실패했습니다.");
    setTimeout(() => setSavMsg(""), 3000);
    setSaving(false);
  };
  const saveAddress = async () => {
    if (!myAddress.name) { setAddrMsg("수령인 이름을 입력해 주세요."); return; }
    if (!myAddress.phone) { setAddrMsg("연락처를 입력해 주세요."); return; }
    if (!myAddress.address) { setAddrMsg("주소를 검색해 주세요."); return; }
    setAddrSaving(true);
    const ok = await db.set("address:" + me.id, myAddress);
    setAddrMsg(ok ? "저장되었습니다! ✓" : "저장에 실패했습니다.");
    setTimeout(() => setAddrMsg(""), 2500); setAddrSaving(false);
  };
  const openPostcode = () => {
    if (!window.daum) { alert("주소 검색 서비스를 불러오는 중입니다."); return; }
    new window.daum.Postcode({ oncomplete: data => setMyAddress(a => ({ ...a, zonecode: data.zonecode, address: data.address })) }).open();
  };
  const handleSelectProduct = prod => { if (!canSelectProduct) return; setSelConfirmProd(prod); };
  const confirmProductSelection = async () => {
    const prod = selConfirmProd; if (!prod) return;
    const now = new Date();
    const dateStr = formatDate(now);
    const slot = mySelections.length + 1;
    let key, sel;
    if (me.grade === G.L) {
      key = "selection:" + me.id + ":cha:" + selectedCha + ":slot:" + slot;
      sel = { productId: prod.id, productName: prod.name, productCode: prod.code, cha: selectedCha, selYear: now.getFullYear(), selMonth: now.getMonth() + 1, selDate: dateStr, slot };
    } else {
      key = "selection:" + me.id + ":" + selYr + ":" + selMo + ":slot:" + slot;
      sel = { productId: prod.id, productName: prod.name, productCode: prod.code, year: selYr, month: selMo, selDate: dateStr, slot };
    }
    const ok = await db.set(key, sel);
    setSelConfirmProd(null);
    if (ok) { await loadMySelections(); setSelMsg("제품이 신청되었습니다! ✓ (" + slot + "/" + myQuota + "건)"); }
    else setSelMsg("저장에 실패했습니다.");
    setTimeout(() => setSelMsg(""), 2500);
  };
  const addProduct = async () => {
    if (!newProd.name || !newProd.code) { setProdMsg("제품명과 코드를 입력해 주세요."); return; }
    const key = prodGrade === G.L ? "products:laroupi:cha:" + prodCha : "products:" + prodGrade + ":" + prodYear + ":" + prodMonth;
    const list = [...prodList, { id: "p" + Date.now(), name: newProd.name, code: newProd.code }];
    const ok = await db.set(key, list);
    if (ok) { setProdList(list); setNewProd({ name: "", code: "" }); setProdMsg("제품 등록 완료! ✓"); }
    setTimeout(() => setProdMsg(""), 2000);
  };
  const delProduct = async id => {
    const key = prodGrade === G.L ? "products:laroupi:cha:" + prodCha : "products:" + prodGrade + ":" + prodYear + ":" + prodMonth;
    const list = prodList.filter(p => p.id !== id);
    await db.set(key, list); setProdList(list);
  };
  const loadPrevMonthProds = async () => {
    setLoadingPrevProd(true);
    let prevYear = prodYear, prevMonth = prodMonth - 1;
    if (prevMonth < 1) { prevMonth = 12; prevYear = prodYear - 1; }
    const key = prodGrade === G.L ? "products:laroupi:cha:" + (prodCha - 1) : "products:" + prodGrade + ":" + prevYear + ":" + prevMonth;
    const prev = await db.get(key) || [];
    if (prev.length === 0) { setProdMsg("지난 기간 등록된 제품이 없습니다."); setTimeout(() => setProdMsg(""), 2500); setLoadingPrevProd(false); return; }
    const currentList = [...prodList]; let added = 0;
    for (const p of prev) {
      if (!currentList.find(c => c.code === p.code)) {
        currentList.push({ ...p, id: "p" + Date.now() + "_" + Math.random().toString(36).slice(2, 5) }); added++;
      }
    }
    const saveKey = prodGrade === G.L ? "products:laroupi:cha:" + prodCha : "products:" + prodGrade + ":" + prodYear + ":" + prodMonth;
    await db.set(saveKey, currentList); setProdList(currentList);
    setProdMsg(added + "개 불러오기 완료! (중복 " + (prev.length - added) + "개 제외)");
    setTimeout(() => setProdMsg(""), 3000); setLoadingPrevProd(false);
  };
  const toggleOpenCha = async (cha, gen) => {
    const key = openChaKey(gen);
    const list = await db.get(key) || [];
    const isOpen = list.includes(cha);
    const next = isOpen ? list.filter(c => c !== cha) : [...list, cha].sort((a, b) => a - b);
    await db.set(key, next);
    setOpenRefresh(r => r + 1);
    setProdMsg(gen + " " + cha + "차 " + (isOpen ? "클로즈" : "오픈") + " 완료! ✓");
    setTimeout(() => setProdMsg(""), 1500);
  };
  const addOpenMonth = async () => {
    const list = await db.get("openMonths:" + prodGrade) || [];
    if (list.find(om => om.year === newOpenMonth.year && om.month === newOpenMonth.month)) { setProdMsg("이미 오픈된 달입니다."); setTimeout(() => setProdMsg(""), 2000); return; }
    const next = [...list, { id: "om" + Date.now(), year: newOpenMonth.year, month: newOpenMonth.month }];
    await db.set("openMonths:" + prodGrade, next); setOpenRefresh(r => r + 1);
    setProdMsg(newOpenMonth.year + "년 " + newOpenMonth.month + "월 오픈 완료! ✓"); setTimeout(() => setProdMsg(""), 2000);
  };
  const uploadPhoto = async (setter, file) => {
    if (!file) return;
    setUploadingCount(c => c + 1);
    try { const compressed = await compressImage(file); setter(compressed); }
    finally { setUploadingCount(c => c - 1); }
  };
  const updBlog = (i, v) => setAct(a => ({ ...a, blogs: a.blogs.map((b, j) => j === i ? { link: v } : b) }));
  const addBlog = () => setAct(a => ({ ...a, blogs: [...a.blogs, { link: "" }] }));
  const delBlog = i => setAct(a => ({ ...a, blogs: a.blogs.filter((_, j) => j !== i) }));
  const updViral = (i, f, v) => setAct(a => ({ ...a, virals: a.virals.map((x, j) => j === i ? { ...x, [f]: v } : x) }));
  const addViral = () => setAct(a => ({ ...a, virals: [...a.virals, { link: "", photo: null }] }));
  const delViral = i => setAct(a => ({ ...a, virals: a.virals.filter((_, j) => j !== i) }));
  const updExtra = (i, f, v) => setAct(a => ({ ...a, extras: a.extras.map((x, j) => j === i ? { ...x, [f]: v } : x) }));
  const addExtra = () => setAct(a => ({ ...a, extras: [...a.extras, { link: "", photo: null }] }));
  const delExtra = i => setAct(a => ({ ...a, extras: a.extras.filter((_, j) => j !== i) }));
  const sendInquiry = async () => {
    if (!iqf.title || !iqf.content) { setIqMsg("제목과 내용을 입력해 주세요."); return; }
    setIqSending(true);
    const list = await db.get("inquiries:" + me.id) || [];
    const next = [{ id: "iq" + Date.now(), title: iqf.title, content: iqf.content, date: new Date().toLocaleDateString("ko-KR"), reply: null, replyDate: null }, ...list];
    if (await db.set("inquiries:" + me.id, next)) { setMyInquiries(next); setIqf({ title: "", content: "" }); setIqMsg("문의가 전송되었습니다! ✓"); }
    else setIqMsg("전송에 실패했습니다.");
    setTimeout(() => setIqMsg(""), 2500); setIqSending(false);
  };
  const addSupporter = async () => {
    const { gen, nick, phone } = af;
    if (!gen || !nick || !phone) { setAmsg("모든 항목을 입력해 주세요."); return; }
    const list = await db.get("supporters") || [];
    if (list.find(s => s.gen === gen.trim() && s.nick === nick.trim())) { setAmsg("동일 기수/닉네임이 존재합니다."); return; }
    const next = [...list, { id: "s" + Date.now(), gen: gen.trim(), nick: nick.trim(), phone: phone.trim(), grade: G.L, joinDate: new Date().toLocaleDateString("ko-KR") }];
    await db.set("supporters", next); setSupps(next); setAf({ gen: "", nick: "", phone: "" }); setAmsg("등록 완료! ✓"); setTimeout(() => setAmsg(""), 2000);
  };
  const changeGrade = async (id, grade) => { const next = supps.map(s => s.id === id ? { ...s, grade } : s); await db.set("supporters", next); setSupps(next); };
  const handleEditSave = async (id, fields) => {
    const next = supps.map(s => s.id === id ? { ...s, ...fields } : s);
    const ok = await db.set("supporters", next);
    if (ok) { setSupps(next); setEditTarget(null); setEditMsg("✅ " + fields.nick + " 회원정보가 수정되었습니다."); setTimeout(() => setEditMsg(""), 3000); }
    else { setEditMsg("저장에 실패했습니다."); setTimeout(() => setEditMsg(""), 2500); }
  };
  const delSupporter = async id => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const next = supps.filter(s => s.id !== id); await db.set("supporters", next); setSupps(next);
    if (viewSupp?.id === id) setViewSupp(null);
  };
  const toggleSelectByGen = gen => {
    const ids = supps.filter(s => s.gen === gen).map(s => s.id);
    const allSelected = ids.every(id => bulkSelected.has(id));
    setBulkSelected(prev => { const next = new Set(prev); if (allSelected) ids.forEach(id => next.delete(id)); else ids.forEach(id => next.add(id)); return next; });
  };
  const toggleSelectAll = () => {
    if (bulkSelected.size === supps.length) setBulkSelected(new Set());
    else setBulkSelected(new Set(supps.map(s => s.id)));
  };
  const applyBulkGrade = async () => {
    if (bulkSelected.size === 0) { setBulkMsg("변경할 회원을 선택해 주세요."); setTimeout(() => setBulkMsg(""), 2000); return; }
    if (!window.confirm("선택한 " + bulkSelected.size + "명을 " + GN[bulkTargetGrade] + "으로 변경하시겠습니까?")) return;
    setBulkSaving(true);
    const next = supps.map(s => bulkSelected.has(s.id) ? { ...s, grade: bulkTargetGrade } : s);
    const ok = await db.set("supporters", next);
    if (ok) { setSupps(next); setBulkSelected(new Set()); setBulkMsg("✅ " + bulkSelected.size + "명 변경 완료!"); }
    else setBulkMsg("저장에 실패했습니다.");
    setBulkSaving(false); setTimeout(() => setBulkMsg(""), 3000);
  };
  const saveNotice = async () => {
    if (!nf.title || !nf.content) { setNmsg("제목과 내용을 입력해 주세요."); return; }
    const list = nGrade === G.L ? [...nlp] : [...nsc];
    list.unshift({ id: "n" + Date.now(), title: nf.title, content: nf.content, date: new Date().toLocaleDateString("ko-KR") });
    await db.set("notices:" + nGrade, list);
    nGrade === G.L ? setNlp(list) : setNsc(list);
    setNf({ title: "", content: "" }); setNmsg("등록 완료! ✓"); setTimeout(() => setNmsg(""), 2000);
  };
  const delNotice = async (grade, id) => {
    const list = (grade === G.L ? nlp : nsc).filter(n => n.id !== id);
    await db.set("notices:" + grade, list); grade === G.L ? setNlp(list) : setNsc(list);
  };
  const openSuppActs = async supp => {
    setViewSupp(supp); setLoadingVA(true);
    const keys = await db.list("activity:" + supp.id + ":");
    const acts = (await Promise.all(keys.map(k => db.get(k)))).filter(Boolean);
    acts.sort((a, b) => (b.cha||0) - (a.cha||0) || (b.year||0) - (a.year||0) || (b.month||0) - (a.month||0));
    setViewActs(acts); setLoadingVA(false);
  };
  const loadAllInquiries = async () => {
    setLoadingIq(true);
    const list = await db.get("supporters") || [];
    const allIqs = await Promise.all(list.map(s => db.get("inquiries:" + s.id).then(iqs => (iqs || []).map(iq => ({ ...iq, suppId: s.id, suppName: s.gen + " · " + s.nick, grade: s.grade })))));
    const result = allIqs.flat().sort((a, b) => b.id.localeCompare(a.id));
    setAllInquiries(result); setLoadingIq(false);
  };
  const sendReply = async () => {
    if (!replyText.trim()) { setReplyMsg("답변 내용을 입력해 주세요."); return; }
    const iqs = await db.get("inquiries:" + selInquiry.suppId) || [];
    const next = iqs.map(iq => iq.id === selInquiry.id ? { ...iq, reply: replyText.trim(), replyDate: new Date().toLocaleDateString("ko-KR"), replyRead: false } : iq);
    if (await db.set("inquiries:" + selInquiry.suppId, next)) {
      const updated = { ...selInquiry, reply: replyText.trim(), replyDate: new Date().toLocaleDateString("ko-KR") };
      setSelInquiry(updated); setAllInquiries(prev => prev.map(iq => iq.id === selInquiry.id ? updated : iq));
      setReplyMsg("답변 등록 완료! ✓"); setReplyText("");
    } else setReplyMsg("등록에 실패했습니다.");
    setTimeout(() => setReplyMsg(""), 2500);
  };
  // 관리자 → 회원 메시지(DM) 함수
  const loadAllDmThreads = async () => {
    setLoadingDmThreads(true);
    const list = await db.get("supporters") || [];
    const allD = await Promise.all(list.map(s => db.get(dmKey(s.id)).then(dms => (dms || []).map(d => ({ ...d, suppId: s.id, suppName: s.gen + " · " + s.nick, grade: s.grade })))));
    const result = allD.flat().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    setAllDmThreads(result);
    setLoadingDmThreads(false);
  };
  const sendAdminDm = async () => {
    if (!dmSuppTarget) { setDmSendMsg("보낼 회원을 선택해 주세요."); return; }
    if (!dmForm.title.trim() || !dmForm.content.trim()) { setDmSendMsg("제목과 내용을 입력해 주세요."); return; }
    setDmSendSaving(true);
    const dms = await db.get(dmKey(dmSuppTarget.id)) || [];
    const now = Date.now();
    const thread = {
      id: "dm" + now,
      title: dmForm.title.trim(),
      messages: [{ from: "admin", text: dmForm.content.trim(), date: new Date().toLocaleString("ko-KR") }],
      supporterRead: false,
      adminRead: true,
      updatedAt: now,
    };
    const next = [thread, ...dms];
    const ok = await db.set(dmKey(dmSuppTarget.id), next);
    setDmSendSaving(false);
    if (ok) {
      setDmForm({ title: "", content: "" });
      setDmSuppTarget(null);
      setDmSendMsg("✅ " + thread.title + " 메시지를 전송했습니다!");
      loadAllDmThreads();
    } else setDmSendMsg("전송에 실패했습니다.");
    setTimeout(() => setDmSendMsg(""), 2500);
  };
  const openDmThread = async d => {
    setSelDmThread(d);
    if (!d.adminRead) {
      const dms = await db.get(dmKey(d.suppId)) || [];
      const next = dms.map(x => x.id === d.id ? { ...x, adminRead: true } : x);
      await db.set(dmKey(d.suppId), next);
      setAllDmThreads(prev => prev.map(x => x.id === d.id ? { ...x, adminRead: true } : x));
    }
  };
  const sendAdminDmReply = async () => {
    if (!selDmThread || !dmAdminReplyText.trim()) { setDmAdminReplyMsg("답변 내용을 입력해 주세요."); return; }
    const dms = await db.get(dmKey(selDmThread.suppId)) || [];
    const now = Date.now();
    const next = dms.map(d => d.id === selDmThread.id
      ? { ...d, messages: [...d.messages, { from: "admin", text: dmAdminReplyText.trim(), date: new Date().toLocaleString("ko-KR") }], supporterRead: false, adminRead: true, updatedAt: now }
      : d);
    const ok = await db.set(dmKey(selDmThread.suppId), next);
    if (ok) {
      const updated = next.find(d => d.id === selDmThread.id);
      const merged = { ...updated, suppId: selDmThread.suppId, suppName: selDmThread.suppName, grade: selDmThread.grade };
      setSelDmThread(merged);
      setAllDmThreads(prev => prev.map(d => d.id === selDmThread.id ? merged : d));
      setDmAdminReplyText("");
      setDmAdminReplyMsg("✅ 전송 완료!");
    } else setDmAdminReplyMsg("전송에 실패했습니다.");
    setTimeout(() => setDmAdminReplyMsg(""), 2000);
  };
  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ["기수", "닉네임", "전화번호끝4자리", "수령인실명", "배송연락처", "우편번호", "주소", "상세주소"],
      ["1기", "예시닉네임", "1234", "홍길동", "010-1234-5678", "12345", "서울시 강남구 테헤란로 1", "101호"]
    ]);
    ws["!cols"] = [{ wch: 8 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 16 }, { wch: 10 }, { wch: 30 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, ws, "써포터즈목록"); XLSX.writeFile(wb, "써포터즈_등록_양식.xlsx");
  };
  const handleExcelUpload = async file => {
    setExcelErr(""); setExcelPreview([]);
    try {
      const ab = await file.arrayBuffer(); const wb = XLSX.read(ab, { type: "array" }); const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
      const parsed = rows.slice(1).filter(r => r[0] || r[1] || r[2]).map(r => ({ gen: String(r[0]||"").trim(), nick: String(r[1]||"").trim(), phone: String(r[2]||"").trim(), name: String(r[3]||"").trim(), deliveryPhone: String(r[4]||"").trim(), zonecode: String(r[5]||"").trim(), address: String(r[6]||"").trim(), addressDetail: String(r[7]||"").trim() })).filter(r => r.gen && r.nick && r.phone);
      if (!parsed.length) { setExcelErr("유효한 데이터가 없습니다."); return; } setExcelPreview(parsed);
    } catch { setExcelErr("파일을 읽을 수 없습니다."); }
  };
  const confirmExcelUpload = async () => {
    const existing = await db.get("supporters") || [];
    const newMembers = excelPreview.filter(p => !existing.find(s => s.gen === p.gen && s.nick === p.nick))
      .map(p => ({ id: "s" + Date.now() + "_" + Math.random().toString(36).slice(2, 6), gen: p.gen, nick: p.nick, phone: p.phone, grade: G.L, joinDate: new Date().toLocaleDateString("ko-KR"), _addr: p.address ? { name: p.name, phone: p.deliveryPhone, zonecode: p.zonecode, address: p.address, addressDetail: p.addressDetail } : null }));
    await Promise.all(newMembers.map(ns => ns._addr ? db.set("address:" + ns.id, ns._addr) : Promise.resolve()));
    const clean = newMembers.map(({ _addr, ...rest }) => rest);
    const next = [...existing, ...clean];
    await db.set("supporters", next); setSupps(next); setExcelPreview([]);
    setAmsg(clean.length + "명 등록 완료!"); setTimeout(() => setAmsg(""), 3000);
  };
  const downloadActivityExcel = async () => {
    setDownloadingAct(true); const wb = XLSX.utils.book_new();
    const targetSupps = supps.filter(s => (actGen === "전체" || s.gen === actGen) && (actGrade === "전체" || s.grade === actGrade));
    const sum = [["기수","닉네임","등급","수령인","연락처","우편번호","주소","년도","월","차수","제품명","제품코드","제출여부","총건수","블로그","바이럴","기타"]];
    const blog = [["기수","닉네임","등급","년도","월","순번","링크"]];
    const viral = [["기수","닉네임","등급","년도","월","순번","링크","사진등록"]];
    const extra = [["기수","닉네임","등급","년도","월","순번","링크","사진등록"]];
    await Promise.all(targetSupps.map(async s => {
      const grade = GN[s.grade];
      const isL = s.grade === G.L;
      const addr = await db.get("address:" + s.id);
      const addrData = addr || {};
      let selItems = [];
      let actMap = {}; // L: {cha:data}, S: {single:data}
      if (isL) {
        const slotKeys = await db.list("selection:" + s.id + ":cha:");
        const allSels = (await Promise.all(slotKeys.map(k => db.get(k)))).filter(Boolean);
        selItems = allSels.filter(cs => cs.selYear === actYear && cs.selMonth === actMonth);
        const chaKeys = await db.list("activity:" + s.id + ":cha:");
        const chaActs = await Promise.all(chaKeys.map(k => db.get(k)));
        chaKeys.forEach((k, i) => { if (chaActs[i]) actMap[+k.split(":")[3]] = chaActs[i]; });
      } else {
        const slotKeys = await db.list("selection:" + s.id + ":" + actYear + ":" + actMonth + ":slot:");
        selItems = (await Promise.all(slotKeys.map(k => db.get(k)))).filter(Boolean);
        const d = await db.get("activity:" + s.id + ":" + actYear + ":" + actMonth);
        if (d) actMap.single = d;
      }
      const hasAnyAct = isL ? Object.keys(actMap).length > 0 : !!actMap.single;
      if (!hasAnyAct && selItems.length === 0) return;

      const rowFor = d => ({
        bc: d ? (d.blogs||[]).filter(b=>b.link).length : 0,
        vc: d ? (d.virals||[]).filter(v=>v.link||v.photo).length : 0,
        ec: d ? (d.extras||[]).filter(e=>e.link||e.photo).length : 0,
      });

      if (selItems.length === 0) {
        const d = isL ? (Object.keys(actMap).length ? actMap[Math.max(...Object.keys(actMap).map(Number))] : null) : actMap.single;
        if (!d) return;
        const {bc,vc,ec} = rowFor(d);
        sum.push([s.gen,s.nick,grade,addrData.name||"",addrData.phone||"",addrData.zonecode||"",[addrData.address,addrData.addressDetail].filter(Boolean).join(" "),actYear,actMonth,"","",d.submitted?"제출완료":"미제출",bc+vc+ec,bc,vc,ec]);
        (d.blogs||[]).forEach((b,i) => { if(b.link) blog.push([s.gen,s.nick,grade,actYear,actMonth,i+1,b.link]); });
        (d.virals||[]).forEach((v,i) => { if(v.link||v.photo) viral.push([s.gen,s.nick,grade,actYear,actMonth,i+1,v.link||"",v.photo?"O":"X"]); });
        (d.extras||[]).forEach((e,i) => { if(e.link||e.photo) extra.push([s.gen,s.nick,grade,actYear,actMonth,i+1,e.link||"",e.photo?"O":"X"]); });
      } else {
        selItems.forEach(sel => {
          const d = isL ? (actMap[sel.cha] || null) : actMap.single;
          const {bc,vc,ec} = rowFor(d);
          sum.push([s.gen,s.nick,grade,addrData.name||"",addrData.phone||"",addrData.zonecode||"",[addrData.address,addrData.addressDetail].filter(Boolean).join(" "),actYear,actMonth,isL?(sel.cha+"차"):"",sel.productName,sel.productCode,d?.submitted?"제출완료":"미제출",bc+vc+ec,bc,vc,ec]);
        });
        const seen = new Set();
        selItems.forEach(sel => {
          const dedupKey = isL ? sel.cha : "single";
          if (seen.has(dedupKey)) return; seen.add(dedupKey);
          const d = isL ? (actMap[sel.cha] || null) : actMap.single;
          if (!d) return;
          (d.blogs||[]).forEach((b,i) => { if(b.link) blog.push([s.gen,s.nick,grade,actYear,actMonth,i+1,b.link]); });
          (d.virals||[]).forEach((v,i) => { if(v.link||v.photo) viral.push([s.gen,s.nick,grade,actYear,actMonth,i+1,v.link||"",v.photo?"O":"X"]); });
          (d.extras||[]).forEach((e,i) => { if(e.link||e.photo) extra.push([s.gen,s.nick,grade,actYear,actMonth,i+1,e.link||"",e.photo?"O":"X"]); });
        });
      }
    }));
    [["활동요약",sum],["블로그",blog],["바이럴",viral],["기타",extra]].forEach(([name,data]) => {
      const ws = XLSX.utils.aoa_to_sheet(data); ws["!cols"] = Array(data[0].length).fill({wch:14}); XLSX.utils.book_append_sheet(wb, ws, name);
    });
    XLSX.writeFile(wb, "LALUPPY_활동내역_"+actYear+"년"+actMonth+"월_"+(actGen==="전체"?"전체기수":actGen)+"_"+(actGrade==="전체"?"전체":GN[actGrade])+".xlsx");
    setDownloadingAct(false);
  };
  const downloadSelectionExcel = async () => {
    setDownloadingSel(true);
    const wb = XLSX.utils.book_new();
    const doLaroupi = actGrade === "전체" || actGrade === G.L;
    const doSecret = actGrade === "전체" || actGrade === G.S;
    if (doLaroupi) {
      const rows = [["기수","닉네임","등급","수령인","연락처","우편번호","주소","차수","슬롯","제품명","제품코드","신청날짜"]];
      await Promise.all(supps.filter(s => s.grade===G.L && (actGen==="전체"||s.gen===actGen)).map(async s => {
        const allKeys = await db.list("selection:"+s.id+":cha:");
        const allSels = (await Promise.all(allKeys.map(k=>db.get(k)))).filter(Boolean);
        const filtered = allSels.filter(sel => sel.selYear===actYear && sel.selMonth===actMonth);
        if (!filtered.length) return;
        const addr = await db.get("address:"+s.id); const a = addr||{};
        filtered.sort((x,y)=>(x.slot||1)-(y.slot||1)).forEach(sel => {
          rows.push([s.gen,s.nick,GN[s.grade],a.name||"",a.phone||"",a.zonecode||"",[a.address,a.addressDetail].filter(Boolean).join(" "),sel.cha+"차",sel.slot||1,sel.productName,sel.productCode,sel.selDate||""]);
        });
      }));
      if (rows.length>1) { const ws=XLSX.utils.aoa_to_sheet(rows); ws["!cols"]=Array(rows[0].length).fill({wch:14}); XLSX.utils.book_append_sheet(wb,ws,"라루피_"+actYear+"년"+actMonth+"월"); }
    }
    if (doSecret) {
      const rows = [["기수","닉네임","등급","수령인","연락처","우편번호","주소","년도","월","슬롯","제품명","제품코드","신청날짜"]];
      await Promise.all(supps.filter(s => s.grade===G.S && (actGen==="전체"||s.gen===actGen)).map(async s => {
        const slotKeys = await db.list("selection:"+s.id+":"+actYear+":"+actMonth+":slot:");
        const sels = (await Promise.all(slotKeys.map(k=>db.get(k)))).filter(Boolean);
        if (!sels.length) return;
        const addr = await db.get("address:"+s.id); const a = addr||{};
        sels.sort((x,y)=>(x.slot||1)-(y.slot||1)).forEach(sel => {
          rows.push([s.gen,s.nick,GN[s.grade],a.name||"",a.phone||"",a.zonecode||"",[a.address,a.addressDetail].filter(Boolean).join(" "),actYear,actMonth,sel.slot||1,sel.productName,sel.productCode,sel.selDate||""]);
        });
      }));
      if (rows.length>1) { const ws=XLSX.utils.aoa_to_sheet(rows); ws["!cols"]=Array(rows[0].length).fill({wch:14}); XLSX.utils.book_append_sheet(wb,ws,"시크릿_"+actYear+"년"+actMonth+"월"); }
    }
    if (wb.SheetNames.length===0) { const ws=XLSX.utils.aoa_to_sheet([["해당 월 신청된 제품이 없습니다."]]); XLSX.utils.book_append_sheet(wb,ws,"결과없음"); }
    XLSX.writeFile(wb,"LALUPPY_신청상품취합_"+actYear+"년"+actMonth+"월_"+(actGen==="전체"?"전체기수":actGen)+"_"+(actGrade==="전체"?"전체":GN[actGrade])+".xlsx");
    setDownloadingSel(false);
  };
  const photoField = (src, setter, required=false) => (
    <div style={{marginTop:6,marginBottom:4}}>
      {src ? (
        <div style={{position:"relative",display:"inline-block"}}>
          <img src={src} alt="" style={{maxWidth:180,maxHeight:140,borderRadius:8,border:"1px solid "+T.border,objectFit:"cover",display:"block"}} />
          <button onClick={()=>setter(null)} style={{position:"absolute",top:4,right:4,background:"rgba(0,0,0,0.55)",color:"#fff",border:"none",borderRadius:12,width:22,height:22,cursor:"pointer",fontSize:13}}>×</button>
        </div>
      ) : (
        <label style={{display:"block",border:"1.5px dashed "+(required?"#C0392B":T.border),borderRadius:8,padding:"10px 14px",textAlign:"center",cursor:"pointer",fontSize:12,color:required?"#C0392B":T.muted,background:"#FAFAFA"}}>
          {uploadingCount>0?"⏳ 압축 중...":required?<>사진 업로드 (필수 *)</>:<>사진 업로드</>}
          <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>e.target.files[0]&&uploadPhoto(setter,e.target.files[0])} />
        </label>
      )}
    </div>
  );
  const ConfirmModal = () => {
    if (!selConfirmProd) return null;
    const isL = me?.grade === G.L;
    const nextSlot = mySelections.length + 1;
    return (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{background:T.card,borderRadius:18,padding:28,maxWidth:340,width:"100%",boxShadow:"0 8px 40px rgba(0,0,0,0.18)"}}>
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{width:56,height:56,borderRadius:"50%",background:T.pcL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 10px"}}><ShoppingBag size={26} color={T.pc}/></div>
            <div style={{fontWeight:800,fontSize:17,marginBottom:6}}>제품 신청 확인</div>
            <div style={{fontSize:13,color:T.muted,lineHeight:1.6}}>신청하시겠습니까?<br/>신청 후 변경은 불가능합니다.</div>
          </div>
          <div style={{background:T.pcL,borderRadius:12,padding:"14px 16px",marginBottom:20}}>
            <div style={{fontWeight:800,fontSize:15,color:T.pc,marginBottom:4}}>{selConfirmProd.name}</div>
            <div style={{fontSize:12,color:T.muted}}>제품 코드: {selConfirmProd.code}</div>
            <div style={{fontSize:12,color:T.muted,marginTop:4}}>
              {isL?selectedCha+"차 신청":selYr+"년 "+selMo+"월 신청"} · {nextSlot}/{myQuota}번째 신청
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={()=>setSelConfirmProd(null)} style={{...S.btn("#EEE8E0",T.text),flex:1}}>취소</button>
            <button onClick={confirmProductSelection} style={{...S.btn(T.pc),flex:2}}>✅ 최종 신청</button>
          </div>
        </div>
      </div>
    );
  };
  // ── LOGIN
  if (view === "login") return (
    <div style={{minHeight:"100vh",background:"radial-gradient(120% 100% at 50% 0%, "+T.pcTertiary+" 0%, "+T.bg+" 55%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Noto Sans KR',sans-serif",padding:16}}>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{width:96,height:96,borderRadius:"50%",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",boxShadow:"0 10px 30px rgba(0,70,56,0.16)",border:"1px solid "+T.border}}>
            {BRAND.logoUrl?<img src={BRAND.logoUrl} alt="LALUPPY" style={{height:48,objectFit:"contain"}}/>:<div style={{fontWeight:900,fontSize:22,color:T.pc}}>{BRAND.logoText}</div>}
          </div>
          <div style={{display:"inline-block",padding:"5px 14px",borderRadius:R.full,background:T.pcL,color:T.pcText,fontSize:11,fontWeight:800,letterSpacing:"0.4px",marginBottom:10}}>SUPPORTERS PLATFORM</div>
          <div style={{fontWeight:900,fontSize:24,color:T.text,letterSpacing:"-0.4px",marginBottom:4}}>{BRAND.logoText}</div>
          <div style={{fontSize:13,color:T.muted}}>써포터즈 활동 관리 플랫폼</div>
        </div>
        <div style={{...S.card,padding:28,borderRadius:R.lg+8,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,"+T.pc+","+T.pcText+")"}}/>
          <div style={{display:"flex",background:"#F0EBE4",borderRadius:R.full,padding:5,marginBottom:22}}>
            {[false,true].map(isA=>(
              <button key={String(isA)} onClick={()=>{setAdminMode(isA);setLerr("");}}
                style={{flex:1,padding:"10px 0",border:"none",borderRadius:R.full,cursor:"pointer",fontWeight:700,fontSize:13,background:adminMode===isA?T.pc:"transparent",color:adminMode===isA?"#fff":T.muted,boxShadow:adminMode===isA?"0 2px 8px rgba(0,70,56,0.25)":"none",transition:"all .15s"}}>
                {isA?"관리자":"써포터즈"}
              </button>
            ))}
          </div>
          {!adminMode?(<>
            <label style={S.lbl}>기수</label>
            <div style={{position:"relative",marginBottom:SP[300]}}>
              <Users size={16} color={T.muted} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/>
              <input style={{...S.inp,marginBottom:0,paddingLeft:40}} placeholder="예: 1기" value={lf.gen} onChange={e=>setLf(f=>({...f,gen:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()} />
            </div>
            <label style={S.lbl}>닉네임</label>
            <div style={{position:"relative",marginBottom:SP[300]}}>
              <User size={16} color={T.muted} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/>
              <input style={{...S.inp,marginBottom:0,paddingLeft:40}} placeholder="닉네임" value={lf.nick} onChange={e=>setLf(f=>({...f,nick:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()} />
            </div>
            <label style={S.lbl}>전화번호 끝 4자리</label>
            <div style={{position:"relative",marginBottom:SP[300]}}>
              <Phone size={16} color={T.muted} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/>
              <input style={{...S.inp,marginBottom:0,paddingLeft:40}} placeholder="예: 5678" maxLength={4} value={lf.phone} onChange={e=>setLf(f=>({...f,phone:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()} />
            </div>
            <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",margin:"12px 0 16px",userSelect:"none"}}>
              <div onClick={()=>setSaveId(v=>!v)} style={{width:20,height:20,borderRadius:5,border:"2px solid "+(saveId?T.pc:T.border),background:saveId?T.pc:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {saveId&&<Check size={13} color="#fff" strokeWidth={3}/>}
              </div>
              <span style={{fontSize:13,color:saveId?T.pc:T.muted,fontWeight:saveId?700:400}} onClick={()=>setSaveId(v=>!v)}>아이디 저장</span>
              {saveId&&<span style={{fontSize:11,color:T.muted,marginLeft:"auto",display:"inline-flex",alignItems:"center",gap:4}}><Smartphone size={12}/> 이 기기에 저장됨</span>}
            </label>
          </>):(<>
            <label style={S.lbl}>관리자 코드</label>
            <div style={{position:"relative",marginBottom:SP[300]}}>
              <ShieldCheck size={16} color={T.muted} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/>
              <input style={{...S.inp,marginBottom:0,paddingLeft:40}} type="password" value={lf.code} onChange={e=>setLf(f=>({...f,code:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&doLogin()} />
            </div>
          </>)}
          {lerr&&<div style={{color:"#C0392B",fontSize:13,marginBottom:10,marginTop:6,textAlign:"center"}}>{lerr}</div>}
          <button onClick={doLogin} style={{...S.btn(T.pc),width:"100%",marginTop:8}}>로그인</button>
        </div>
      </div>
    </div>
  );
  // ── SUPPORTER
  if (view === "supporter" && me) {
    const isL = me.grade === G.L;
    const canAddMore = canSelectProduct && mySelections.length < myQuota;
    const missionTargeted = !missionSetting || missionSetting.targetMode !== "selected" || (missionSetting.targetIds || []).includes(me.id);
    const isMissionOpen = missionSetting && missionSetting.isOpen && missionTargeted;
    const missionDeadline = missionSetting?.deadline || "";
    const isPastDeadline = missionDeadline && new Date() > new Date(missionDeadline);
    const hasUnreadDm = myDms.some(d => d.messages?.length && d.messages[d.messages.length - 1].from === "admin" && !d.supporterRead);
    return (
      <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'Noto Sans KR',sans-serif",color:T.text,paddingBottom:60}}>
        <ConfirmModal />
        {popupDm && <DmPopupModal thread={popupDm} onReply={replyDmFromPopup} onClose={closeDmPopup} sending={dmReplySendingId === popupDm.id} />}
        {!popupDm && popupIq && <InquiryReplyPopupModal iq={popupIq} onClose={closeIqPopup} />}
        <div style={{background:T.card,borderBottom:"1px solid "+T.border,padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 6px rgba(0,0,0,0.05)"}}>
          <div><Logo /><div style={{fontSize:11,color:T.muted,marginTop:2}}>{me.gen} · {me.nick}&nbsp;<span style={S.tag(me.grade)}>{GN[me.grade]}</span></div></div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {[["notices","공지"],["months","활동"],["product","제품"],["mission","튼특미션"],["myinfo","내정보"],["inquiry","문의"]].map(([id,label])=>(
              <button key={id} onClick={()=>{setSp(id);if(id==="product"){loadMyQuota();}}}
                style={{...S.btn(sp===id?T.pc:id==="mission"?(isMissionOpen?T.missionL:"#EEE8E0"):"#EEE8E0",sp===id?"#fff":id==="mission"?(isMissionOpen?T.mission:T.text):T.text,true),position:"relative"}}>
                {label}
                {id==="mission"&&myMission?.status==="submitted"&&<span style={{position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:4,background:"#E0B97A",display:"block"}}/>}
                {id==="mission"&&myMission?.status==="rejected"&&<span style={{position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:4,background:"#C0392B",display:"block"}}/>}
                {id==="inquiry"&&hasUnreadDm&&<span style={{position:"absolute",top:-3,right:-3,width:8,height:8,borderRadius:4,background:"#C0392B",display:"block"}}/>}
              </button>
            ))}
            <button onClick={()=>{setView("login");setMe(null);setLf({gen:"",nick:"",phone:"",code:""});sessionStorage.clear();}} style={S.btn("#FDECEA","#C0392B",true)}><LogOut size={13} style={{verticalAlign:-2,marginRight:4}}/>로그아웃</button>
          </div>
        </div>
        {uploadingCount>0&&(
          <div style={{background:"#FFF8E1",borderBottom:"1px solid #FFE082",padding:"8px 16px",textAlign:"center",fontSize:13,color:"#B8860B",fontWeight:700,position:"sticky",top:57,zIndex:99}}>
            ⏳ 사진 압축 중... ({uploadingCount}장) 완료 후 저장해 주세요.
          </div>
        )}
        <div style={{...S.ctr,paddingTop:20}}>
          {sp==="notices"&&(<>
            <div style={S.h1}><Megaphone size={20} style={{verticalAlign:-4,marginRight:6}}/>공지사항</div>
            {myNotices.length===0
              ?<div style={{...S.card,textAlign:"center",color:T.muted,padding:40}}>등록된 공지사항이 없습니다.</div>
              :myNotices.map(n=>(<div key={n.id} style={S.card}><div style={{fontWeight:700,marginBottom:6}}>{n.title}</div><div style={{fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{n.content}</div><div style={{fontSize:11,color:T.muted,marginTop:8}}>{n.date}</div></div>))}
            <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:4}}>
              {isMissionOpen&&!isPastDeadline&&(
                <button onClick={()=>setSp("mission")} style={{...S.btn(T.missionL,T.mission),width:"100%",fontSize:15,padding:"14px",border:"2px solid "+T.mission}}>
                  <Target size={16} style={{verticalAlign:-3,marginRight:6}}/>튼특미션 참여하기 <ArrowRight size={14} style={{verticalAlign:-2}}/>
                  {missionDeadline&&<span style={{fontSize:11,marginLeft:8,opacity:0.8}}>마감 {missionDeadline}</span>}
                </button>
              )}
              <button onClick={()=>setSp("product")} style={{...S.btn(T.pcL,T.pc),width:"100%",fontSize:15,padding:"14px"}}><ShoppingBag size={16} style={{verticalAlign:-3,marginRight:6}}/>제품 신청하기 <ArrowRight size={14} style={{verticalAlign:-2}}/></button>
              <button onClick={()=>setSp("months")} style={{...S.btn(T.pc),width:"100%"}}><PenLine size={16} style={{verticalAlign:-3,marginRight:6}}/>활동 내역 입력하기 <ArrowRight size={14} style={{verticalAlign:-2}}/></button>
            </div>
          </>)}
          {sp==="mission"&&(<>
            <div style={S.h1}><Target size={20} style={{verticalAlign:-4,marginRight:6}}/>튼특크림써포터즈 미션</div>
            {!isMissionOpen?(
              <div style={{...S.card,textAlign:"center",color:T.muted,padding:40}}>
                <Lock size={30} color="#CBD3D0" style={{margin:"0 auto 8px"}}/>
                <div style={{fontWeight:700}}>현재 미션이 오픈되지 않았습니다.</div>
              </div>
            ):isPastDeadline&&myMission?.status!=="submitted"&&myMission?.status!=="approved"?(
              <div style={{...S.card,textAlign:"center",padding:32}}>
                <div style={{fontSize:28,marginBottom:8}}>⏰</div>
                <div style={{fontWeight:700,color:"#C0392B"}}>미션 마감이 종료되었습니다.</div>
                <div style={{fontSize:12,color:T.muted,marginTop:6}}>마감일: {missionDeadline}</div>
              </div>
            ):(<>
              <div style={{background:T.missionL,border:"2px solid "+T.mission,borderRadius:14,padding:16,marginBottom:14}}>
                <div style={{fontWeight:800,fontSize:15,color:T.mission,marginBottom:8}}>🧴 {missionSetting.prodName||"튼특크림"} 추가 미션</div>
                <div style={{fontSize:13,lineHeight:1.8,color:T.text}}>
                  ✅ 미션 완료 시 <strong>제품 1개 추가 신청 가능!</strong><br/>
                  📌 바이럴 {MISSION_VIRAL_COUNT}건 (링크 + 사진 필수)<br/>
                  {missionDeadline&&<span>⏰ 마감일: <strong>{missionDeadline}</strong></span>}
                </div>
                {myMission?.status&&(
                  <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:12,color:T.muted}}>현재 상태:</span>
                    <MissionBadge status={myMission.status}/>
                  </div>
                )}
              </div>
              {myMission?.status==="rejected"&&myMission.rejectedReason&&(
                <div style={{background:"#FDECEA",border:"1.5px solid #C0392B",borderRadius:10,padding:"12px 14px",marginBottom:14}}>
                  <div style={{fontWeight:700,fontSize:13,color:"#C0392B",marginBottom:4}}>❌ 반려 사유</div>
                  <div style={{fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{myMission.rejectedReason}</div>
                  <div style={{fontSize:11,color:T.muted,marginTop:6}}>내용을 수정하여 다시 제출해 주세요.</div>
                </div>
              )}
              <div style={S.card}>
                <div style={S.h2}><Rss size={16} style={{verticalAlign:-3,marginRight:6}}/>튼특 바이럴 ({MISSION_VIRAL_COUNT}건 필수 · 최대 {MISSION_VIRAL_MAX}건)</div>
                {(myMission||blankMission()).virals.map((v,i)=>(
                  <div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom:i<MISSION_VIRAL_COUNT-1?"1px solid "+T.border:"none"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                      <label style={S.lbl}>바이럴 {i+1} {i<MISSION_VIRAL_COUNT&&<span style={{color:"#C0392B"}}>*</span>}</label>
                      {myMission?.status!=="approved"&&i>=MISSION_VIRAL_COUNT&&(
                        <button onClick={()=>delMissionViral(i)} style={S.btn("#FDECEA","#C0392B",true)}>삭제</button>
                      )}
                    </div>
                    <input
                      style={{...S.inp,background:myMission?.status==="approved"?"#F5F5F5":"#FAFAFA"}}
                      placeholder="링크 입력"
                      value={v.link||""}
                      readOnly={myMission?.status==="approved"}
                      onChange={e=>{ if(myMission?.status==="approved") return; updMissionViral(i,"link",e.target.value); }}
                    />
                    {myMission?.status==="approved"
                      ?v.photo&&<img src={v.photo} alt="" style={{maxWidth:180,maxHeight:140,borderRadius:8,border:"1px solid "+T.border,objectFit:"cover"}}/>
                      :photoField(v.photo, val=>updMissionViral(i,"photo",val), true)
                    }
                  </div>
                ))}
                {myMission?.status!=="approved"&&(myMission||blankMission()).virals.length<MISSION_VIRAL_MAX&&(
                  <button onClick={addMissionViral} style={{...S.btn(T.pcL,T.pc,true),width:"100%"}}><Plus size={13} style={{verticalAlign:-2,marginRight:4}}/>바이럴 추가 ({(myMission||blankMission()).virals.length}/{MISSION_VIRAL_MAX})</button>
                )}
              </div>
              {myMission?.status!=="approved"&&(<>
                <button
                  onClick={saveMissionDraft}
                  disabled={missionSaving}
                  style={{...S.btn(T.missionL,T.mission),width:"100%",marginBottom:8,opacity:missionSaving?0.7:1}}>
                  {missionSaving?"저장 중...":<><Save size={14} style={{verticalAlign:-2,marginRight:5}}/>임시저장</>}
                </button>
                <button
                  onClick={submitMission}
                  disabled={missionSaving}
                  style={{...S.btn(T.mission),width:"100%",opacity:missionSaving?0.7:1}}>
                  {missionSaving?"제출 중...":myMission?.status==="submitted"?"🔄 재제출":myMission?.status==="rejected"?"🔄 수정 후 재제출":"✅ 미션 제출"}
                </button>
              </>)}
              {myMission?.status==="approved"&&(
                <div style={{padding:"14px",background:"#E8F5E9",borderRadius:10,textAlign:"center",fontWeight:700,color:"#2E7D32",fontSize:14}}>
                  ✅ 미션 승인 완료! 제품 추가 신청이 활성화되었습니다.
                </div>
              )}
              {missionMsg&&<div style={{textAlign:"center",marginTop:10,fontSize:13,fontWeight:700,color:T.mission}}>{missionMsg}</div>}
            </>)}
          </>)}
          {sp==="months"&&(<>
            <div style={S.h1}>{isL?<><Target size={20} style={{verticalAlign:-4,marginRight:6}}/>활동 차수 선택</>:<><ClipboardList size={20} style={{verticalAlign:-4,marginRight:6}}/>활동 월 선택</>}</div>
            {isL?(
              <div style={S.card}>
                <div style={{fontSize:13,color:T.muted,marginBottom:16}}>관리자가 오픈한 차수를 선택하세요.</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                  {LACHAS.map(cha=>{
                    const saved=savedChas.includes(cha); const isOpen=openChaList.includes(cha);
                    return (
                      <button key={cha} onClick={()=>isOpen&&selectCha(cha)}
                        style={{padding:"22px 0",borderRadius:12,border:"2px solid "+(!isOpen?"#EEE":saved?T.pc:T.border),background:!isOpen?"#F5F5F5":saved?T.pcL:T.card,color:!isOpen?"#CCC":saved?T.pc:T.text,fontWeight:800,cursor:isOpen?"pointer":"not-allowed",fontSize:18,position:"relative"}}>
                        {cha}차
                        {!isOpen&&<div style={{fontSize:11,color:"#CCC",fontWeight:400,display:"flex",alignItems:"center",gap:3}}><Lock size={11}/>미오픈</div>}
                        {isOpen&&saved&&<span style={{position:"absolute",top:6,right:6,width:8,height:8,borderRadius:4,background:T.pc,display:"block"}}/>}
                        {isOpen&&!saved&&<div style={{fontSize:10,color:T.muted,fontWeight:400,marginTop:2}}>입력하기</div>}
                      </button>
                    );
                  })}
                </div>
                <div style={{fontSize:11,color:T.muted,marginTop:14}}>💡 초록 점 표시된 차수는 저장된 활동이 있습니다.</div>
              </div>
            ):(
              <div style={S.card}>
                <label style={S.lbl}>년도</label>
                <select value={yr} onChange={e=>setYr(Number(e.target.value))} style={{...S.inp}}>{YEARS.map(y=><option key={y} value={y}>{y}년</option>)}</select>
                <label style={S.lbl}>월</label>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:4}}>
                  {MONTHS.map(m=>{
                    const saved=savedMonths.some(s=>s.year===yr&&s.month===m); const accessible=isMonthAccessible(yr,m);
                    return (
                      <button key={m} onClick={()=>accessible&&selectMonth(yr,m)}
                        style={{padding:"10px 0",borderRadius:10,border:"2px solid "+(!accessible?"#EEE":saved?T.pc:T.border),background:!accessible?"#F5F5F5":saved?T.pcL:T.card,color:!accessible?"#CCC":saved?T.pc:T.text,fontWeight:700,cursor:accessible?"pointer":"not-allowed",fontSize:13,position:"relative"}}>
                        {m}월{!accessible&&<Lock size={9} color="#CCC"/>}
                        {accessible&&saved&&<span style={{position:"absolute",top:4,right:4,width:6,height:6,borderRadius:3,background:T.pc,display:"block"}}/>}
                      </button>
                    );
                  })}
                </div>
                <div style={{fontSize:11,color:T.muted,marginTop:12,display:"flex",alignItems:"center",gap:4}}><Lock size={11}/>표시된 달은 아직 오픈되지 않았습니다.</div>
              </div>
            )}
          </>)}
          {sp==="activity"&&act&&(<>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,flexWrap:"wrap"}}>
              <button onClick={()=>setSp("months")} style={S.btn("#EEE8E0",T.text,true)}>← {isL?"차수":"월"} 선택</button>
              <div style={{fontWeight:800,fontSize:16}}>{isL?selectedActCha+"차 활동":yr+"년 "+mo+"월"}</div>
              <span style={S.tag(me.grade)}>{GN[me.grade]}</span>
              {act.submitted&&<span style={{fontSize:11,padding:"3px 10px",borderRadius:10,fontWeight:700,background:"#E8F5E9",color:"#2E7D32"}}>✅ 제출완료</span>}
            </div>
            {isL&&(
              <div style={S.card}>
                <div style={S.h2}><PenLine size={16} style={{verticalAlign:-3,marginRight:6}}/>블로그</div>
                {act.blogs.map((b,i)=>(
                  <div key={i} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                      <label style={S.lbl}>블로그 {i+1} {i<2&&<span style={{color:"#C0392B"}}>*</span>}</label>
                      {i>=2&&<button onClick={()=>delBlog(i)} style={S.btn("#FDECEA","#C0392B",true)}>삭제</button>}
                    </div>
                    <input style={S.inp} placeholder="블로그 링크 입력" value={b.link} onChange={e=>updBlog(i,e.target.value)} />
                  </div>
                ))}
                <button onClick={addBlog} style={{...S.btn(T.pcL,T.pc,true),width:"100%"}}>+ 블로그 추가</button>
              </div>
            )}
            <div style={S.card}>
              <div style={S.h2}><Rss size={16} style={{verticalAlign:-3,marginRight:6}}/>바이럴</div>
              {act.virals.map((v,i)=>(
                <div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom:i<act.virals.length-1?"1px solid "+T.border:"none"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <label style={S.lbl}>바이럴 {i+1} {i<5&&<span style={{color:"#C0392B"}}>*</span>}</label>
                    <button onClick={()=>delViral(i)} style={S.btn("#FDECEA","#C0392B",true)}>삭제</button>
                  </div>
                  <input style={S.inp} placeholder="링크 입력" value={v.link} onChange={e=>updViral(i,"link",e.target.value)} />
                  {photoField(v.photo,val=>updViral(i,"photo",val),true)}
                </div>
              ))}
              <button onClick={addViral} style={{...S.btn(T.pcL,T.pc,true),width:"100%"}}>+ 바이럴 추가</button>
            </div>
            <div style={S.card}>
              <div style={{...S.h2,marginBottom:4}}><Pin size={16} style={{verticalAlign:-3,marginRight:6}}/>기타 <span style={{fontWeight:400,fontSize:12,color:T.muted}}>(선택)</span></div>
              <div style={{fontSize:12,color:T.muted,marginBottom:14}}>링크 또는 사진 중 하나 이상 입력</div>
              {act.extras.length===0&&<div style={{textAlign:"center",color:T.muted,fontSize:13,padding:"10px 0"}}>+ 버튼으로 추가하세요</div>}
              {act.extras.map((e,i)=>(
                <div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom:i<act.extras.length-1?"1px solid "+T.border:"none"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                    <label style={S.lbl}>기타 {i+1}</label>
                    <button onClick={()=>delExtra(i)} style={S.btn("#FDECEA","#C0392B",true)}>삭제</button>
                  </div>
                  <input style={S.inp} placeholder="링크 입력 (선택)" value={e.link||""} onChange={ev=>updExtra(i,"link",ev.target.value)} />
                  {photoField(e.photo,val=>updExtra(i,"photo",val),false)}
                </div>
              ))}
              <button onClick={addExtra} style={{...S.btn(T.pcL,T.pc,true),width:"100%"}}>+ 기타 추가</button>
            </div>
            <div style={{display:"flex",gap:10,position:"sticky",bottom:16}}>
              <button onClick={()=>doSave(false)} disabled={saving||uploadingCount>0} style={{...S.btn("#EEE8E0",T.text),flex:1,opacity:(saving||uploadingCount>0)?0.5:1}}>{uploadingCount>0?"⏳ 압축 중...":<><Save size={14} style={{verticalAlign:-2,marginRight:5}}/>임시저장</>}</button>
              <button onClick={()=>doSave(true)} disabled={saving||uploadingCount>0}
                style={{...S.btn(T.pc),flex:2,opacity:saving?0.7:1}}>
                {uploadingCount>0?"⏳ 압축 중...":act.submitted?"🔄 재제출":"✅ 최종 제출"}
              </button>
            </div>
            {savMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:T.pc}}>{savMsg}</div>}
          </>)}
          {sp==="product"&&(<>
            <div style={S.h1}><ShoppingBag size={20} style={{verticalAlign:-4,marginRight:6}}/>제품 선택</div>
            {myMission?.status==="approved"&&(
              <div style={{padding:"10px 14px",background:T.missionL,border:"1.5px solid "+T.mission,borderRadius:10,marginBottom:14,fontSize:13,color:T.mission,fontWeight:600}}>
                🎯 튼특미션 승인! 제품 1개 추가 신청이 가능합니다.
              </div>
            )}
            {!canSelectProduct?(
              <div style={{padding:"12px 14px",background:"#FDECEA",borderRadius:10,marginBottom:14,fontSize:13,color:"#C0392B",fontWeight:600}}>
                ⚠️ {canSelectReason}
                <div style={{marginTop:8}}><button onClick={()=>setSp("months")} style={S.btn("#C0392B",undefined,true)}>활동 입력하러 가기 →</button></div>
              </div>
            ):(
              mySelections.length>=myQuota
                ?<div style={{padding:"12px 14px",background:"#E8F5E9",borderRadius:10,marginBottom:14,fontSize:13,color:"#2E7D32",fontWeight:600}}>✅ {myQuota}건 신청 완료!</div>
                :<div style={{padding:"12px 14px",background:"#E8F5E9",borderRadius:10,marginBottom:14,fontSize:13,color:"#2E7D32",fontWeight:600}}>
                  ✅ 제품 신청 가능 · {mySelections.length}/{myQuota}건 신청됨
                  {myQuota>BASE_QUOTA[me.grade]&&<span style={{marginLeft:6,fontSize:11,background:"#C8E6C9",borderRadius:6,padding:"1px 7px"}}>+{myQuota-BASE_QUOTA[me.grade]} 추가 허용</span>}
                </div>
            )}
            <div style={S.card}>
              {isL?(
                <>
                  <div style={{fontWeight:700,fontSize:13,color:T.muted,marginBottom:10}}>신청할 차수를 선택하세요</div>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
                    {LACHAS.map(cha=>{
                      const isOpen=openChaList.includes(cha); const isSel=selectedCha===cha;
                      return (
                        <button key={cha} onClick={()=>isOpen&&setSelectedCha(cha)}
                          style={{padding:"10px 16px",borderRadius:10,border:"2px solid "+(isSel?T.pc:isOpen?T.border:"#EEE"),background:isSel?T.pc:isOpen?T.card:"#F5F5F5",color:isSel?"#fff":isOpen?T.text:"#CCC",fontWeight:700,fontSize:14,cursor:isOpen?"pointer":"not-allowed",minWidth:52}}>
                          {cha}차{!isOpen&&<Lock size={9}/>}
                        </button>
                      );
                    })}
                  </div>
                </>
              ):(
                <div style={{display:"flex",gap:8,marginBottom:16}}>
                  <select value={selYr} onChange={e=>setSelYr(+e.target.value)} style={{...S.sel,flex:1}}>{YEARS.map(y=><option key={y} value={y}>{y}년</option>)}</select>
                  <select value={selMo} onChange={e=>setSelMo(+e.target.value)} style={{...S.sel,flex:1}}>{MONTHS.map(m=><option key={m} value={m}>{m}월</option>)}</select>
                </div>
              )}
              {mySelections.length>0&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:12,fontWeight:700,color:T.muted,marginBottom:8}}>신청된 제품</div>
                  {mySelections.map((sel,i)=>(
                    <div key={i} style={{padding:"10px 14px",background:T.pcL,borderRadius:8,marginBottom:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:11,color:T.pc,fontWeight:700,marginBottom:1}}>{i+1}번째 신청 · {sel.selDate||""}</div>
                        <div style={{fontWeight:700,fontSize:13}}>{sel.productName}</div>
                        <div style={{fontSize:11,color:T.muted}}>코드: {sel.productCode}</div>
                      </div>
                      <span style={{fontSize:18,color:T.pc}}>✓</span>
                    </div>
                  ))}
                </div>
              )}
              {canAddMore&&(<>
                <div style={{fontSize:12,fontWeight:700,color:T.muted,marginBottom:10}}>{mySelections.length+1}번째 제품을 선택하세요</div>
                {availableProds.length===0
                  ?<div style={{textAlign:"center",color:T.muted,padding:32,fontSize:13}}>선택 가능한 제품이 없습니다.</div>
                  :<div style={{display:"flex",flexDirection:"column",gap:10}}>
                    {availableProds.map(p=>{
                      const alreadySelected=mySelections.some(s=>s.productId===p.id);
                      return (
                        <div key={p.id} onClick={()=>!alreadySelected&&handleSelectProduct(p)}
                          style={{padding:"14px 16px",borderRadius:10,border:"2px solid "+(alreadySelected?"#CCC":T.border),background:alreadySelected?"#F5F5F5":T.card,cursor:alreadySelected?"not-allowed":"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",opacity:alreadySelected?0.5:1}}>
                          <div><div style={{fontWeight:700,fontSize:14}}>{p.name}</div><div style={{fontSize:12,color:T.muted,marginTop:2}}>코드: {p.code}</div></div>
                          {alreadySelected
                            ?<span style={{fontSize:11,color:T.muted,padding:"3px 8px",borderRadius:6,background:"#E8E8E8"}}>이미 신청됨</span>
                            :<span style={{fontSize:11,color:T.pc,padding:"3px 8px",borderRadius:6,background:T.pcL}}>신청하기</span>}
                        </div>
                      );
                    })}
                  </div>}
              </>)}
              {!canAddMore&&mySelections.length>0&&canSelectProduct&&(
                <div style={{textAlign:"center",padding:"14px 0",fontSize:13,color:T.muted}}>최대 신청 건수({myQuota}건)를 모두 신청하셨습니다.</div>
              )}
              {selMsg&&<div style={{textAlign:"center",marginTop:12,fontSize:13,fontWeight:700,color:T.pc}}>{selMsg}</div>}
            </div>
          </>)}
          {sp==="myinfo"&&(<>
            <div style={S.h1}><Package size={20} style={{verticalAlign:-4,marginRight:6}}/>배송 주소</div>
            {myAddress.address&&!addrEditMode?(
              <div style={S.card}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontWeight:700,fontSize:14}}>등록된 배송 정보</div>
                  <button onClick={()=>setAddrEditMode(true)} style={S.btn(T.pcL,T.pc,true)}><Pencil size={13} style={{verticalAlign:-2,marginRight:4}}/>수정하기</button>
                </div>
                {[["수령인",myAddress.name],["연락처",myAddress.phone],["우편번호",myAddress.zonecode],["주소",myAddress.address],["상세주소",myAddress.addressDetail||"-"]].map(([label,value])=>(
                  <div key={label} style={{display:"flex",gap:12,padding:"10px 14px",background:"#F9F6F2",borderRadius:8,marginBottom:8}}>
                    <span style={{fontSize:12,color:T.muted,minWidth:60,fontWeight:700}}>{label}</span>
                    <span style={{fontSize:13,fontWeight:500}}>{value}</span>
                  </div>
                ))}
              </div>
            ):(
              <div style={S.card}>
                {addrEditMode&&(
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div style={{fontWeight:700,fontSize:14}}>배송 정보 수정</div>
                    <button onClick={()=>setAddrEditMode(false)} style={S.btn("#EEE8E0",T.text,true)}>← 취소</button>
                  </div>
                )}
                {!addrEditMode&&<div style={{fontSize:13,color:T.muted,marginBottom:14}}>제품 배송을 위한 수령인 정보와 주소를 등록해 주세요.</div>}
                <label style={S.lbl}>수령인 이름 *</label><input style={S.inp} placeholder="실명 입력" value={myAddress.name||""} onChange={e=>setMyAddress(a=>({...a,name:e.target.value}))} />
                <label style={S.lbl}>연락처 *</label><input style={S.inp} placeholder="예: 010-1234-5678" value={myAddress.phone||""} onChange={e=>setMyAddress(a=>({...a,phone:e.target.value}))} />
                <label style={S.lbl}>주소 검색</label>
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <input style={{...S.inp,marginBottom:0,flex:1}} placeholder="우편번호" value={myAddress.zonecode} readOnly />
                  <button onClick={openPostcode} style={{...S.btn(T.pc),whiteSpace:"nowrap",padding:"10px 16px"}}><Search size={13} style={{verticalAlign:-2,marginRight:4}}/>검색</button>
                </div>
                <input style={S.inp} placeholder="기본 주소" value={myAddress.address} readOnly />
                <label style={S.lbl}>상세 주소</label>
                <input style={S.inp} placeholder="동/호수 등 상세 주소 입력" value={myAddress.addressDetail} onChange={e=>setMyAddress(a=>({...a,addressDetail:e.target.value}))} />
                <button onClick={async()=>{await saveAddress();if(myAddress.address)setAddrEditMode(false);}} disabled={addrSaving} style={{...S.btn(T.pc),width:"100%",opacity:addrSaving?0.7:1}}>
                  {addrSaving?"저장 중...":"주소 저장"}
                </button>
                {addrMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:T.pc}}>{addrMsg}</div>}
              </div>
            )}
          </>)}
          {sp==="inquiry"&&(<>
            <div style={S.h1}><MessageCircle size={20} style={{verticalAlign:-4,marginRight:6}}/>관리자 문의</div>
            {myDms.length>0&&(<>
              <div style={{fontWeight:700,fontSize:14,marginBottom:10}}><Send size={16} style={{verticalAlign:-3,marginRight:6}}/>관리자 메시지 ({myDms.length}건)</div>
              {myDms.slice().sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0)).map(d=>{
                const lastMsg=d.messages[d.messages.length-1];
                const hasUnread=lastMsg?.from==="admin"&&!d.supporterRead;
                return (
                  <div key={d.id} style={{...S.card,borderLeft:"3px solid "+(hasUnread?"#C0392B":T.pc)}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{fontWeight:700,fontSize:14}}>{d.title}</div>
                      {hasUnread&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700,background:"#FDECEA",color:"#C0392B"}}>NEW</span>}
                    </div>
                    {d.messages.map((m,i)=>(
                      <div key={i} style={{marginBottom:8,textAlign:m.from==="admin"?"left":"right"}}>
                        <div style={{display:"inline-block",maxWidth:"85%",padding:"8px 12px",borderRadius:10,fontSize:13,background:m.from==="admin"?"#F9F6F2":T.pcL,whiteSpace:"pre-wrap",textAlign:"left"}}>{m.text}</div>
                        <div style={{fontSize:10,color:T.muted,marginTop:2}}>{m.from==="admin"?"관리자":"나"} · {m.date}</div>
                      </div>
                    ))}
                    <div style={{display:"flex",gap:8,marginTop:10}}>
                      <input style={{...S.inp,marginBottom:0,flex:1}} placeholder="답장 입력" value={dmReplyDrafts[d.id]||""} onChange={e=>setDmReplyDrafts(p=>({...p,[d.id]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&sendDmReply(d.id,dmReplyDrafts[d.id]||"")} />
                      <button onClick={()=>sendDmReply(d.id,dmReplyDrafts[d.id]||"")} disabled={dmReplySendingId===d.id} style={S.btn(T.pc,undefined,true)}>전송</button>
                    </div>
                  </div>
                );
              })}
            </>)}
            <div style={S.card}>
              <label style={S.lbl}>제목</label><input style={S.inp} placeholder="문의 제목" value={iqf.title} onChange={e=>setIqf(f=>({...f,title:e.target.value}))} />
              <label style={S.lbl}>내용</label><textarea style={{...S.inp,minHeight:100,resize:"vertical"}} placeholder="문의 내용" value={iqf.content} onChange={e=>setIqf(f=>({...f,content:e.target.value}))} />
              <button onClick={sendInquiry} disabled={iqSending} style={{...S.btn(T.pc),width:"100%",opacity:iqSending?0.7:1}}>{iqSending?"전송 중...":"📨 문의 전송"}</button>
              {iqMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:T.pc}}>{iqMsg}</div>}
            </div>
            <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>내 문의 내역 ({myInquiries.length}건)</div>
            {myInquiries.length===0
              ?<div style={{...S.card,textAlign:"center",color:T.muted,padding:32,fontSize:13}}>아직 문의 내역이 없습니다.</div>
              :myInquiries.map(iq=>(
                <div key={iq.id} style={{...S.card,borderLeft:"3px solid "+(iq.reply&&iq.replyRead===false?"#C0392B":iq.reply?T.pc:T.border)}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6,gap:8}}>
                    <div style={{fontWeight:700,fontSize:14}}>{iq.title}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                      {iq.reply&&iq.replyRead===false&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700,background:"#FDECEA",color:"#C0392B"}}>NEW</span>}
                      <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700,background:iq.reply?T.pcL:"#F5F5F5",color:iq.reply?T.pc:T.muted,whiteSpace:"nowrap"}}>{iq.reply?"답변완료":"답변대기"}</span>
                    </div>
                  </div>
                  <div style={{fontSize:13,color:T.muted,marginBottom:6,whiteSpace:"pre-wrap"}}>{iq.content}</div>
                  <div style={{fontSize:11,color:T.muted}}>{iq.date}</div>
                  {iq.reply&&(
                    <div style={{marginTop:12,padding:"10px 14px",background:T.pcL,borderRadius:8}}>
                      <div style={{fontSize:11,fontWeight:700,color:T.pc,marginBottom:4}}>💬 관리자 답변 · {iq.replyDate}</div>
                      <div style={{fontSize:13,whiteSpace:"pre-wrap",lineHeight:1.6}}>{iq.reply}</div>
                    </div>
                  )}
                </div>
              ))}
          </>)}
        </div>
      </div>
    );
  }
  // ── ADMIN
  if (view === "admin") return (
    <div style={{minHeight:"100vh",background:T.bg,fontFamily:"'Noto Sans KR',sans-serif",color:T.text,paddingBottom:60}}>
      {editTarget&&<EditMemberModal supp={editTarget} existingSupps={supps} onSave={handleEditSave} onClose={()=>setEditTarget(null)}/>}
      {rejectTarget&&<RejectModal suppName={rejectTarget.suppName} onConfirm={reason=>rejectMission(rejectTarget,reason)} onClose={()=>setRejectTarget(null)}/>}
      <div style={{background:T.pc,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:100}}>
        <Logo dark/><span style={{color:"rgba(255,255,255,0.6)",fontSize:12}}>관리자</span>
        <button onClick={()=>{setView("login");setLf(f=>({...f,code:""}));sessionStorage.clear();}} style={S.btn("rgba(255,255,255,0.15)","#fff",true)}><LogOut size={13} style={{verticalAlign:-2,marginRight:4}}/>로그아웃</button>
      </div>
      <div style={{display:"flex",background:T.card,borderBottom:"1px solid "+T.border,overflowX:"auto"}}>
        {[["supporters","써포터즈"],["notices","공지사항"],["products","제품관리"],["activities","활동조회"],["missions","튼특미션"],["inquiries","문의관리"]].map(([id,tabName])=>(
          <button key={id} onClick={()=>{
            setAtab(id);
            if(id==="inquiries"){setIqSubTab("received");setSelInquiry(null);setSelDmThread(null);loadAllInquiries();}
            if(id==="activities")setViewSupp(null);
            if(id==="products")loadAdminProds();
            if(id==="missions"){loadAllMissions();db.get(missionSettingKey()).then(ms=>{if(ms)setMissionSettingForm({targetMode:"all",targetIds:[],...ms});});}
          }}
            style={{flex:1,minWidth:60,padding:"12px 6px",border:"none",background:"none",cursor:"pointer",fontWeight:700,fontSize:12,color:atab===id?T.pc:T.muted,borderBottom:"2px solid "+(atab===id?T.pc:"transparent"),whiteSpace:"nowrap"}}>
            {tabName}
          </button>
        ))}
      </div>
      <div style={{...S.ctr,paddingTop:20}}>
        {atab==="supporters"&&(<>
          <div style={S.card}>
            <div style={S.h2}><UserPlus size={16} style={{verticalAlign:-3,marginRight:6}}/>써포터즈 등록</div>
            <label style={S.lbl}>기수</label><input style={S.inp} placeholder="예: 1기" value={af.gen} onChange={e=>setAf(f=>({...f,gen:e.target.value}))} />
            <label style={S.lbl}>닉네임</label><input style={S.inp} placeholder="닉네임" value={af.nick} onChange={e=>setAf(f=>({...f,nick:e.target.value}))} />
            <label style={S.lbl}>전화번호 끝 4자리</label><input style={S.inp} placeholder="예: 5678" maxLength={4} value={af.phone} onChange={e=>setAf(f=>({...f,phone:e.target.value}))} />
            <button onClick={addSupporter} style={{...S.btn("#2C2C2C"),width:"100%"}}>등록하기</button>
            {amsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,color:T.pc}}>{amsg}</div>}
          </div>
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={S.h2}><FileSpreadsheet size={16} style={{verticalAlign:-3,marginRight:6}}/>회원 엑셀 일괄 등록</div>
              <button onClick={downloadTemplate} style={S.btn(T.pcL,T.pc,true)}><Download size={13} style={{verticalAlign:-2,marginRight:4}}/>양식</button>
            </div>
            <div style={{fontSize:12,color:T.muted,marginBottom:10}}>기수·닉네임·전화번호 필수 / 주소 선택</div>
            <label style={{display:"block",border:"1.5px dashed "+T.border,borderRadius:8,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:13,color:T.muted,background:"#FAFAFA",marginBottom:8}}>
              📂 엑셀 파일 선택<input type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={e=>e.target.files[0]&&handleExcelUpload(e.target.files[0])} />
            </label>
            {excelErr&&<div style={{color:"#C0392B",fontSize:13,marginBottom:8}}>{excelErr}</div>}
            {excelPreview.length>0&&(<>
              <div style={{maxHeight:140,overflowY:"auto",border:"1px solid "+T.border,borderRadius:8,marginBottom:10}}>
                {excelPreview.map((p,i)=>(<div key={i} style={{padding:"7px 12px",borderBottom:"1px solid "+T.border,fontSize:13,display:"flex",gap:10}}><span style={{color:T.muted}}>{i+1}</span><span style={{fontWeight:700}}>{p.gen}</span><span>{p.nick}</span><span style={{color:T.muted}}>{p.phone}</span>{p.address&&<span style={{color:T.pc,fontSize:11,display:"inline-flex",alignItems:"center",gap:3}}><Package size={11}/>주소있음</span>}</div>))}
              </div>
              <div style={{display:"flex",gap:8}}><button onClick={confirmExcelUpload} style={{...S.btn(T.pc),flex:1}}>✅ 등록 확정</button><button onClick={()=>setExcelPreview([])} style={S.btn("#EEE8E0",T.text)}>취소</button></div>
            </>)}
          </div>
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:bulkMode?14:0}}>
              <div style={S.h2}><Users size={16} style={{verticalAlign:-3,marginRight:6}}/>일괄 등급 변경</div>
              <button onClick={()=>{setBulkMode(v=>!v);setBulkSelected(new Set());setBulkMsg("");}} style={S.btn(bulkMode?"#EEE8E0":T.pcL,bulkMode?T.text:T.pc,true)}>
                {bulkMode?"취소":"선택 모드 켜기"}
              </button>
            </div>
            {bulkMode&&(<>
              <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
                <span style={{fontSize:13,color:T.muted,fontWeight:600}}>변경할 등급:</span>
                {[[G.L,"라루피"],[G.S,"라루피시크릿"]].map(([g,name])=>(
                  <button key={g} onClick={()=>setBulkTargetGrade(g)}
                    style={{padding:"6px 14px",borderRadius:8,border:"2px solid "+(bulkTargetGrade===g?GC[g]:T.border),background:bulkTargetGrade===g?GB[g]:T.card,color:bulkTargetGrade===g?GC[g]:T.muted,fontWeight:700,fontSize:13,cursor:"pointer"}}>
                    {name}
                  </button>
                ))}
              </div>
              <div style={{marginBottom:10}}>
                <div style={{fontSize:12,fontWeight:700,color:T.muted,marginBottom:8}}>기수별 전체선택</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
                  <button onClick={toggleSelectAll} style={{padding:"5px 12px",borderRadius:6,border:"1.5px solid "+(bulkSelected.size===supps.length?T.pc:T.border),background:bulkSelected.size===supps.length?T.pc:T.card,color:bulkSelected.size===supps.length?"#fff":T.text,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    {bulkSelected.size===supps.length?"전체 해제":"전체 선택"}
                  </button>
                  {[...new Set(supps.map(s=>s.gen))].sort().map(gen=>{
                    const ids=supps.filter(s=>s.gen===gen).map(s=>s.id);
                    const allSel=ids.length>0&&ids.every(id=>bulkSelected.has(id));
                    const someSel=ids.some(id=>bulkSelected.has(id));
                    return (
                      <button key={gen} onClick={()=>toggleSelectByGen(gen)}
                        style={{padding:"5px 12px",borderRadius:6,border:"1.5px solid "+(allSel?T.pc:someSel?"#90B8A8":T.border),background:allSel?T.pc:someSel?T.pcL:T.card,color:allSel?"#fff":someSel?T.pc:T.text,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                        {gen} ({ids.length}명)
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                <div style={{fontSize:13,color:T.pc,fontWeight:700,flex:1}}>
                  {bulkSelected.size>0?bulkSelected.size+"명 선택됨 → "+GN[bulkTargetGrade]+"으로 변경":"회원을 선택하세요"}
                </div>
                <button onClick={applyBulkGrade} disabled={bulkSaving||bulkSelected.size===0}
                  style={{...S.btn(bulkSelected.size===0?"#CCC":GC[bulkTargetGrade]),padding:"9px 18px",opacity:bulkSaving?0.7:1,cursor:bulkSelected.size===0?"not-allowed":"pointer"}}>
                  {bulkSaving?"저장 중...":"✅ 일괄 변경"}
                </button>
              </div>
              {bulkMsg&&<div style={{fontSize:13,fontWeight:700,color:T.pc,marginTop:8}}>{bulkMsg}</div>}
            </>)}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={S.h2}>써포터즈 목록 ({supps.length}명)</div>
          </div>
          <div style={{background:T.card,borderRadius:12,padding:"12px 14px",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",marginBottom:14}}>
            <div style={{display:"flex",background:"#F0EBE4",borderRadius:8,padding:3,marginBottom:10}}>
              {[["전체","전체"],["laroupi","라루피"],["laroupisecret","라루피시크릿"]].map(([val,label])=>(
                <button key={val} onClick={()=>setSuppSearchGrade(val)}
                  style={{flex:1,padding:"7px 0",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:12,background:suppSearchGrade===val?(val==="laroupi"?GB.laroupi:val==="laroupisecret"?GB.laroupisecret:T.card):"transparent",color:suppSearchGrade===val?(val==="laroupi"?GC.laroupi:val==="laroupisecret"?GC.laroupisecret:T.pc):T.muted,boxShadow:suppSearchGrade===val?"0 1px 4px rgba(0,0,0,0.1)":"none"}}>
                  {label}
                </button>
              ))}
            </div>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"}}><Search size={15} color={T.muted}/></span>
              <input style={{width:"100%",padding:"9px 36px",border:"1.5px solid "+(suppSearch?T.pc:T.border),borderRadius:8,fontSize:13,outline:"none",boxSizing:"border-box",background:"#FAFAFA",fontFamily:"inherit"}}
                placeholder="기수 또는 닉네임으로 검색" value={suppSearch} onChange={e=>setSuppSearch(e.target.value)} />
              {suppSearch&&<button onClick={()=>setSuppSearch("")} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:16,color:T.muted,lineHeight:1,padding:0}}>×</button>}
            </div>
            {(suppSearch||suppSearchGrade!=="전체")&&(()=>{
              const cnt=supps.filter(s=>{const gm=suppSearchGrade==="전체"||s.grade===suppSearchGrade;const q=suppSearch.trim().toLowerCase();return gm&&(!q||(s.nick.toLowerCase().includes(q)||s.gen.toLowerCase().includes(q)));}).length;
              return <div style={{marginTop:8,fontSize:12,color:cnt>0?T.pc:T.muted,fontWeight:cnt>0?700:400}}>{cnt>0?cnt+"명 검색됨":"검색 결과가 없습니다."}</div>;
            })()}
          </div>
          {editMsg&&<div style={{padding:"10px 14px",background:"#E8F5E9",borderRadius:10,marginBottom:12,fontSize:13,color:"#2E7D32",fontWeight:600}}>{editMsg}</div>}
          {(()=>{
            const filteredSupps=supps.filter(s=>{const gm=suppSearchGrade==="전체"||s.grade===suppSearchGrade;const q=suppSearch.trim().toLowerCase();return gm&&(!q||(s.nick.toLowerCase().includes(q)||s.gen.toLowerCase().includes(q)));});
            if(supps.length===0) return <div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>등록된 써포터즈가 없습니다.</div>;
            if(filteredSupps.length===0) return <div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>검색 결과가 없습니다.</div>;
            return filteredSupps.map(s=>{
              const isChecked=bulkSelected.has(s.id);
              return (
                <div key={s.id} onClick={()=>{if(bulkMode){setBulkSelected(prev=>{const next=new Set(prev);isChecked?next.delete(s.id):next.add(s.id);return next;});}}}
                  style={{...S.card,display:"flex",alignItems:"center",gap:8,padding:"12px 16px",cursor:bulkMode?"pointer":"default",border:isChecked?"2px solid "+T.pc:"2px solid transparent",background:isChecked?T.pcL:T.card}}>
                  {bulkMode&&<div style={{width:20,height:20,borderRadius:5,border:"2px solid "+(isChecked?T.pc:T.border),background:isChecked?T.pc:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{isChecked&&<span style={{color:"#fff",fontSize:12,lineHeight:1}}>✓</span>}</div>}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:14}}>{s.gen} · {s.nick}</div>
                    <div style={{fontSize:11,color:T.muted}}>끝자리: {s.phone} · {s.joinDate}</div>
                  </div>
                  {!bulkMode&&<select value={s.grade} onChange={e=>changeGrade(s.id,e.target.value)} style={{border:"1.5px solid "+T.border,borderRadius:6,padding:"4px 8px",fontSize:12,fontWeight:700,color:GC[s.grade],background:GB[s.grade],cursor:"pointer",outline:"none"}}><option value={G.L}>라루피</option><option value={G.S}>라루피시크릿</option></select>}
                  {bulkMode&&<span style={S.tag(s.grade)}>{GN[s.grade]}</span>}
                  {!bulkMode&&<button onClick={e=>{e.stopPropagation();setEditTarget(s);}} style={S.btn(T.pcL,T.pc,true)}><Pencil size={13} style={{verticalAlign:-2,marginRight:4}}/>수정</button>}
                  {!bulkMode&&<button onClick={()=>openSuppActs(s)} style={S.btn("#EEE8E0",T.text,true)}>조회</button>}
                  {!bulkMode&&<button onClick={()=>delSupporter(s.id)} style={S.btn("#FDECEA","#C0392B",true)}>삭제</button>}
                </div>
              );
            });
          })()}
        </>)}
        {atab==="notices"&&(<>
          <div style={S.card}>
            <div style={S.h2}><Megaphone size={16} style={{verticalAlign:-3,marginRight:6}}/>공지사항 등록</div>
            <div style={{display:"flex",background:"#F0EBE4",borderRadius:10,padding:4,marginBottom:14}}>
              {[[G.L,"라루피"],[G.S,"라루피시크릿"]].map(([g,name])=>(
                <button key={g} onClick={()=>setNGrade(g)} style={{flex:1,padding:"8px 0",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,background:nGrade===g?T.card:"transparent",color:nGrade===g?GC[g]:T.muted,boxShadow:nGrade===g?"0 1px 4px rgba(0,0,0,0.1)":"none"}}>{name}</button>
              ))}
            </div>
            <input style={S.inp} placeholder="제목" value={nf.title} onChange={e=>setNf(f=>({...f,title:e.target.value}))} />
            <textarea style={{...S.inp,minHeight:80,resize:"vertical"}} placeholder="내용" value={nf.content} onChange={e=>setNf(f=>({...f,content:e.target.value}))} />
            <button onClick={saveNotice} style={{...S.btn("#2C2C2C"),width:"100%"}}>공지 등록</button>
            {nmsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,color:T.pc}}>{nmsg}</div>}
          </div>
          {[[G.L,nlp],[G.S,nsc]].map(([g,list])=>(
            <div key={g}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,marginTop:4}}><span style={S.tag(g)}>{GN[g]}</span><span style={{fontWeight:700}}>공지 ({list.length}건)</span></div>
              {list.length===0&&<div style={{...S.card,textAlign:"center",color:T.muted,padding:20,fontSize:13}}>등록된 공지가 없습니다.</div>}
              {list.map(n=>(
                <div key={n.id} style={{...S.card,padding:"12px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
                    <div style={{flex:1}}><div style={{fontWeight:700,marginBottom:4}}>{n.title}</div><div style={{fontSize:13,color:T.muted,whiteSpace:"pre-wrap"}}>{n.content}</div><div style={{fontSize:11,color:T.muted,marginTop:6}}>{n.date}</div></div>
                    <button onClick={()=>delNotice(g,n.id)} style={S.btn("#FDECEA","#C0392B",true)}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>)}
        {atab==="products"&&(<>
          <div style={S.card}>
            <div style={{display:"flex",background:"#F0EBE4",borderRadius:10,padding:4,marginBottom:14}}>
              {[[G.L,"라루피"],[G.S,"라루피시크릿"]].map(([g,name])=>(
                <button key={g} onClick={()=>{setProdGrade(g);setProdGen("");}}
                  style={{flex:1,padding:"8px 0",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,background:prodGrade===g?T.card:"transparent",color:prodGrade===g?GC[g]:T.muted,boxShadow:prodGrade===g?"0 1px 4px rgba(0,0,0,0.1)":"none"}}>
                  {name}
                </button>
              ))}
            </div>
            {prodGrade===G.L&&(<>
              <div style={{fontWeight:700,fontSize:14,marginBottom:6,display:"flex",alignItems:"center",gap:6}}><Unlock size={15}/>기수별 차수 오픈 관리</div>
              <div style={{fontSize:12,color:T.muted,marginBottom:12}}>기수를 선택한 후 차수를 오픈/클로즈 하세요.</div>
              <label style={S.lbl}>기수 선택</label>
              {(()=>{
                const laroupiGens=[...new Set(supps.filter(s=>s.grade===G.L).map(s=>s.gen))].sort();
                return (
                  <select value={prodGen} onChange={e=>{setProdGen(e.target.value);setOpenRefresh(r=>r+1);}} style={{...S.inp,marginBottom:14}}>
                    <option value="">— 기수를 선택하세요 —</option>
                    {laroupiGens.map(gen=><option key={gen} value={gen}>{gen}</option>)}
                  </select>
                );
              })()}
              {prodGen?(<>
                <OpenChaListByGen gen={prodGen} refreshKey={openRefresh}/>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:4}}>
                  {LACHAS.map(cha=><OpenChaToggleByGen key={cha} cha={cha} gen={prodGen} refreshKey={openRefresh} onToggle={()=>toggleOpenCha(cha,prodGen)}/>)}
                </div>
              </>):<div style={{padding:"14px",background:"#F9F6F2",borderRadius:10,textAlign:"center",fontSize:13,color:T.muted}}>기수를 선택하면 차수 오픈 현황을 볼 수 있습니다.</div>}
              {prodMsg&&<div style={{fontSize:13,color:T.pc,marginTop:10,fontWeight:700}}>{prodMsg}</div>}
            </>)}
            {prodGrade===G.S&&(<>
              <div style={{fontWeight:700,fontSize:14,marginBottom:4,display:"flex",alignItems:"center",gap:6}}><Unlock size={15}/>활동 오픈 달 설정</div>
              <div style={{fontSize:12,color:T.muted,marginBottom:12}}>오픈된 달만 써포터즈가 미래 달 활동을 입력할 수 있습니다.</div>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
                <select value={newOpenMonth.year} onChange={e=>setNewOpenMonth(m=>({...m,year:+e.target.value}))} style={{...S.sel,flex:1}}>{YEARS.map(y=><option key={y} value={y}>{y}년</option>)}</select>
                <select value={newOpenMonth.month} onChange={e=>setNewOpenMonth(m=>({...m,month:+e.target.value}))} style={{...S.sel,flex:1}}>{MONTHS.map(m=><option key={m} value={m}>{m}월</option>)}</select>
                <button onClick={addOpenMonth} style={{...S.btn(T.pc,undefined,true),padding:"8px 14px",whiteSpace:"nowrap"}}><Unlock size={13} style={{verticalAlign:-2,marginRight:4}}/>오픈</button>
              </div>
              {prodMsg&&<div style={{fontSize:13,color:T.pc,marginBottom:10,fontWeight:700}}>{prodMsg}</div>}
              <div style={{fontSize:12,fontWeight:700,color:T.muted,marginBottom:8}}>현재 오픈된 달</div>
              <OpenMonthList grade={prodGrade} refreshKey={openRefresh}/>
            </>)}
          </div>
          <div style={S.card}>
            <div style={S.h2}><ShoppingBag size={16} style={{verticalAlign:-3,marginRight:6}}/>제품 등록</div>
            {prodGrade===G.L?(
              <>
                <label style={S.lbl}>차수 선택</label>
                <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
                  {LACHAS.map(cha=>(
                    <button key={cha} onClick={()=>setProdCha(cha)}
                      style={{padding:"8px 16px",borderRadius:8,border:"2px solid "+(prodCha===cha?T.pc:T.border),background:prodCha===cha?T.pc:T.card,color:prodCha===cha?"#fff":T.text,fontWeight:700,cursor:"pointer",fontSize:13}}>
                      {cha}차
                    </button>
                  ))}
                </div>
                <div style={{fontSize:12,color:T.muted,marginBottom:14}}>라루피 {prodCha}차 제품</div>
              </>
            ):(
              <div style={{display:"flex",gap:8,marginBottom:14}}>
                <select value={prodYear} onChange={e=>setProdYear(+e.target.value)} style={{...S.sel,flex:1}}>{YEARS.map(y=><option key={y} value={y}>{y}년</option>)}</select>
                <select value={prodMonth} onChange={e=>setProdMonth(+e.target.value)} style={{...S.sel,flex:1}}>{MONTHS.map(m=><option key={m} value={m}>{m}월</option>)}</select>
              </div>
            )}
            <label style={S.lbl}>제품명</label><input style={S.inp} placeholder="제품명 입력" value={newProd.name} onChange={e=>setNewProd(p=>({...p,name:e.target.value}))} />
            <label style={S.lbl}>제품 코드</label><input style={S.inp} placeholder="제품 코드 입력" value={newProd.code} onChange={e=>setNewProd(p=>({...p,code:e.target.value}))} />
            <div style={{display:"flex",gap:8,marginTop:4}}>
              <button onClick={addProduct} style={{...S.btn(T.pc),flex:2}}><Plus size={15} style={{verticalAlign:-2,marginRight:4}}/>제품 추가</button>
              <button onClick={loadPrevMonthProds} disabled={loadingPrevProd} style={{...S.btn(T.pcL,T.pc),flex:1,fontSize:12,opacity:loadingPrevProd?0.7:1}}>
                {loadingPrevProd?"불러오는 중...":prodGrade===G.L?(prodCha-1>0?prodCha-1+"차":"이전")+" 불러오기":"지난달 불러오기"}
              </button>
            </div>
            {prodMsg&&<div style={{fontSize:13,color:T.pc,marginTop:10,fontWeight:700}}>{prodMsg}</div>}
          </div>
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div style={S.h2}><Gift size={16} style={{verticalAlign:-3,marginRight:6}}/>추가 신청 허용 설정</div>
              <div style={{fontSize:11,padding:"3px 8px",borderRadius:6,background:T.pcL,color:T.pc,fontWeight:700}}>기본: 라루피 {BASE_QUOTA[G.L]}건 · 시크릿 {BASE_QUOTA[G.S]}건</div>
            </div>
            <div style={{fontSize:12,color:T.muted,marginBottom:14}}>{prodGrade===G.L?"라루피 "+prodCha+"차":"라루피시크릿 "+prodYear+"년 "+prodMonth+"월"} 기준</div>
            <div style={{background:"#F9F6F2",borderRadius:10,padding:"12px 14px",marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,color:T.muted,marginBottom:8}}>회원 검색</div>
              <div style={{position:"relative",marginBottom:8}}>
                <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",display:"flex"}}><Search size={14} color={T.muted}/></span>
                <input style={{width:"100%",padding:"8px 10px 8px 32px",border:"1.5px solid "+(extraQuotaSearch?T.pc:T.border),borderRadius:8,fontSize:13,outline:"none",boxSizing:"border-box",background:"#fff",fontFamily:"inherit"}}
                  placeholder="기수 또는 닉네임으로 검색" value={extraQuotaSearch} onChange={e=>setExtraQuotaSearch(e.target.value)} />
                {extraQuotaSearch&&<button onClick={()=>setExtraQuotaSearch("")} style={{position:"absolute",right:8,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:14,color:T.muted,padding:0}}>×</button>}
              </div>
              {extraQuotaSearch.trim().length>=1&&(()=>{
                const q=extraQuotaSearch.trim().toLowerCase();
                const matches=supps.filter(s=>s.grade===prodGrade&&(s.nick.toLowerCase().includes(q)||s.gen.toLowerCase().includes(q))).slice(0,6);
                if(matches.length===0) return <div style={{fontSize:12,color:T.muted,textAlign:"center",padding:"8px 0"}}>검색 결과가 없습니다.</div>;
                return matches.map(s=>{
                  const existing=extraQuotaList.find(eq=>eq.suppId===s.id);
                  const currentExtra=existing?.extraCount||0;
                  const total=BASE_QUOTA[s.grade]+currentExtra;
                  return (
                    <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:currentExtra>0?"#E8F5E9":T.card,borderRadius:8,marginBottom:6,border:"1px solid "+(currentExtra>0?"#A5D6A7":T.border)}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:13}}>{s.gen} · {s.nick}</div>
                        <div style={{fontSize:11,color:T.muted}}>현재 {total}건 신청 가능 (기본 {BASE_QUOTA[s.grade]}+추가 {currentExtra})</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <button onClick={()=>saveExtraQuota(s.id,Math.max(0,currentExtra-1))} style={{width:26,height:26,borderRadius:6,border:"1.5px solid "+T.border,background:T.card,cursor:"pointer",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                        <span style={{fontWeight:800,fontSize:15,color:T.pc,minWidth:18,textAlign:"center"}}>+{currentExtra}</span>
                        <button onClick={()=>saveExtraQuota(s.id,currentExtra+1)} style={{width:26,height:26,borderRadius:6,border:"1.5px solid "+T.pc,background:T.pcL,cursor:"pointer",fontWeight:700,fontSize:15,color:T.pc,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
            <div style={{fontSize:12,fontWeight:700,color:T.muted,marginBottom:8}}>
              추가 허용된 회원 ({extraQuotaList.length}명)
              <button onClick={loadExtraQuota} disabled={loadingEQ} style={{...S.btn("#EEE8E0",T.text,true),marginLeft:8,fontSize:11}}>새로고침</button>
            </div>
            {loadingEQ&&<div style={{textAlign:"center",padding:12,color:T.muted,fontSize:12}}>불러오는 중...</div>}
            {!loadingEQ&&extraQuotaList.length===0&&<div style={{textAlign:"center",padding:"10px 0",color:T.muted,fontSize:12}}>추가 허용된 회원이 없습니다.</div>}
            {!loadingEQ&&extraQuotaList.map(eq=>(
              <div key={eq.suppId} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"#E8F5E9",borderRadius:8,marginBottom:6,border:"1px solid #A5D6A7"}}>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:13}}>{eq.suppName}</div>
                  <div style={{fontSize:11,color:T.muted}}>기본 {BASE_QUOTA[eq.grade]||"-"}건 + 추가 {eq.extraCount}건 = 총 {(BASE_QUOTA[eq.grade]||0)+eq.extraCount}건</div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <button onClick={()=>saveExtraQuota(eq.suppId,Math.max(0,eq.extraCount-1))} style={{width:26,height:26,borderRadius:6,border:"1.5px solid "+T.border,background:T.card,cursor:"pointer",fontWeight:700,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                  <span style={{fontWeight:800,fontSize:15,color:T.pc,minWidth:18,textAlign:"center"}}>+{eq.extraCount}</span>
                  <button onClick={()=>saveExtraQuota(eq.suppId,eq.extraCount+1)} style={{width:26,height:26,borderRadius:6,border:"1.5px solid "+T.pc,background:T.pcL,cursor:"pointer",fontWeight:700,fontSize:15,color:T.pc,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>
            {prodGrade===G.L?"라루피 "+prodCha+"차":"라루피시크릿 "+prodYear+"년 "+prodMonth+"월"} 제품 ({prodList.length}개)
          </div>
          {prodList.length===0
            ?<div style={{...S.card,textAlign:"center",color:T.muted,padding:24,fontSize:13}}>등록된 제품이 없습니다.</div>
            :prodList.map(p=>(
              <div key={p.id} style={{...S.card,display:"flex",alignItems:"center",gap:10,padding:"12px 16px"}}>
                <div style={{flex:1}}><div style={{fontWeight:700}}>{p.name}</div><div style={{fontSize:12,color:T.muted}}>코드: {p.code}</div></div>
                <button onClick={()=>delProduct(p.id)} style={S.btn("#FDECEA","#C0392B",true)}>삭제</button>
              </div>
            ))}
        </>)}
        {atab==="activities"&&(<>
          {!viewSupp?(<>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
              <span style={S.h2}>활동 현황</span>
              <select value={actYear} onChange={e=>{const y=+e.target.value;setActYear(y);loadActSummary(y);}} style={S.sel}>{YEARS.map(y=><option key={y} value={y}>{y}년</option>)}</select>
              <select value={actMonth} onChange={e=>setActMonth(+e.target.value)} style={S.sel}>{MONTHS.map(m=><option key={m} value={m}>{m}월</option>)}</select>
              <select value={actGen} onChange={e=>setActGen(e.target.value)} style={S.sel}>
                <option value="전체">전체 기수</option>
                {[...new Set(supps.map(s=>s.gen))].sort().map(g=><option key={g} value={g}>{g}</option>)}
              </select>
              <select value={actGrade} onChange={e=>setActGrade(e.target.value)} style={S.sel}>
                <option value="전체">전체 등급</option>
                <option value={G.L}>라루피</option>
                <option value={G.S}>라루피시크릿</option>
              </select>
              <select value={actStatusFilter} onChange={e=>setActStatusFilter(e.target.value)} style={S.sel}>
                <option value="all">전체 상태 (활동한 회원 우선정렬)</option>
                <option value="active">활동한 회원만 (진행중+제출완료)</option>
                <option value="submitted">제출완료만</option>
                <option value="none">미입력만</option>
              </select>
              <button onClick={()=>loadActSummary(actYear)} style={S.btn("#EEE8E0",T.text,true)}>새로고침</button>
            </div>
            <div style={{background:T.pcL,borderRadius:10,padding:"10px 14px",marginBottom:10,fontSize:12,color:T.pc,fontWeight:700}}>
              📋 다운로드 기준: {actYear}년 {actMonth}월 · {actGen==="전체"?"전체 기수":actGen} · {actGrade==="전체"?"전체 등급":GN[actGrade]}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              <button onClick={downloadActivityExcel} disabled={downloadingAct||downloadingSel} style={{...S.btn(T.pc,undefined,true),padding:"8px 14px",flex:1,opacity:downloadingAct?0.7:1}}>{downloadingAct?"생성 중...":<><Download size={13} style={{verticalAlign:-2,marginRight:4}}/>활동내역 엑셀</>}</button>
              <button onClick={downloadSelectionExcel} disabled={downloadingAct||downloadingSel} style={{...S.btn(T.pcText,undefined,true),padding:"8px 14px",flex:1,opacity:downloadingSel?0.7:1}}>{downloadingSel?"생성 중...":<><Package size={13} style={{verticalAlign:-2,marginRight:4}}/>신청상품 취합</>}</button>
            </div>
            {supps.length===0&&<div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>등록된 써포터즈가 없습니다.</div>}
            {loadingSum&&<div style={{textAlign:"center",padding:20,color:T.muted}}>불러오는 중...</div>}
            {!loadingSum&&(()=>{
              const rows=supps.filter(s=>(actGen==="전체"||s.gen===actGen)&&(actGrade==="전체"||s.grade===actGrade)).map(s=>{
                const isL=s.grade===G.L;
                const summary=actSummary[s.id]||{};
                let d=null, chaLabel="";
                if (isL) {
                  const chaKeys=Object.keys(summary.cha||{}).map(Number);
                  if (chaKeys.length) { const latest=Math.max(...chaKeys); d=summary.cha[latest]; chaLabel=latest+"차 · "; }
                } else {
                  d=(summary.month||{})[actMonth];
                }
                const has=!!d&&d.total>0;
                const rank=d?.submitted?2:has?1:0; // 2=제출완료, 1=진행중, 0=미입력
                return { s, d, has, isL, chaLabel, rank };
              });
              const filtered=rows.filter(r=>{
                if (actStatusFilter==="active") return r.rank>=1;
                if (actStatusFilter==="submitted") return r.rank===2;
                if (actStatusFilter==="none") return r.rank===0;
                return true;
              });
              // 활동한 회원 우선 정렬 (제출완료 > 진행중 > 미입력), 동순위 내에서는 원래 순서 유지
              const sorted=filtered.map((r,i)=>({...r,i})).sort((a,b)=>b.rank-a.rank||a.i-b.i);
              if (sorted.length===0) return <div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>조건에 맞는 회원이 없습니다.</div>;
              return sorted.map(({s,d,has,isL,chaLabel})=>(
                <div key={s.id} style={{...S.card,padding:"14px 16px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:14}}>{s.gen} · {s.nick}</div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3,flexWrap:"wrap"}}>
                        <span style={S.tag(s.grade)}>{GN[s.grade]}</span>
                        {isL&&chaLabel&&<span style={{fontSize:11,color:T.muted}}>{chaLabel}</span>}
                        {d?.submitted
                          ?<span style={{fontSize:11,padding:"1px 8px",borderRadius:10,background:"#E8F5E9",color:"#2E7D32",fontWeight:700}}>✅ 제출완료</span>
                          :has?<span style={{fontSize:11,padding:"1px 8px",borderRadius:10,background:"#FFF3E0",color:"#E67E22",fontWeight:700}}>진행중 · {d.total}건</span>
                          :<span style={{fontSize:11,color:"#BBB"}}>미입력</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:10,height:10,borderRadius:5,background:d?.submitted?"#2E7D32":has?"#E67E22":"#DDD"}}/>
                      <button onClick={()=>openSuppActs(s)} style={has?S.btn(T.pcL,T.pc,true):S.btn("#F2F1EE","#BBB",true)}>상세 조회</button>
                    </div>
                  </div>
                </div>
              ));
            })()}
          </>):(<>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <button onClick={()=>setViewSupp(null)} style={S.btn("#EEE8E0",T.text,true)}>← 목록</button>
              <div><div style={{fontWeight:800}}>{viewSupp.gen} · {viewSupp.nick}</div><span style={S.tag(viewSupp.grade)}>{GN[viewSupp.grade]}</span></div>
            </div>
            {loadingVA?<div style={{textAlign:"center",padding:40,color:T.muted}}>불러오는 중...</div>
              :viewActs.length===0?<div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>등록된 활동 내역이 없습니다.</div>
              :viewActs.map(a=>(
                <div key={(a.year||"")+(a.month||"")+(a.cha||"")} style={S.card}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                    <div style={{fontWeight:800,fontSize:15,color:T.pc}}>{a.cha?a.cha+"차":a.year+"년 "+a.month+"월"}</div>
                    {a.submitted&&<span style={{fontSize:11,padding:"3px 10px",borderRadius:10,background:"#E8F5E9",color:"#2E7D32",fontWeight:700}}>✅ 제출완료</span>}
                  </div>
                  {a.blogs&&a.blogs.some(b=>b.link)&&(
                    <div style={{marginBottom:14}}>
                      <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📝 블로그 ({a.blogs.filter(b=>b.link).length}건)</div>
                      {a.blogs.map((b,i)=>b.link&&<div key={i} style={{fontSize:13,marginBottom:6}}>{i+1}. <a href={b.link} target="_blank" rel="noreferrer" style={{color:T.pc,wordBreak:"break-all"}}>{b.link}</a></div>)}
                    </div>
                  )}
                  {a.virals&&a.virals.some(v=>v.link||v.photo)&&(
                    <div style={{marginBottom:14}}>
                      <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📣 바이럴 ({a.virals.filter(v=>v.link||v.photo).length}건)</div>
                      {a.virals.map((v,i)=>(v.link||v.photo)&&(
                        <div key={i} style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid "+T.border}}>
                          <div style={{fontSize:12,color:T.muted,marginBottom:4}}>바이럴 {i+1}</div>
                          {v.link&&<div style={{fontSize:13,marginBottom:6}}><a href={v.link} target="_blank" rel="noreferrer" style={{color:T.pc,wordBreak:"break-all"}}>{v.link}</a></div>}
                          {v.photo&&<img src={v.photo} alt="" style={{maxWidth:160,maxHeight:120,borderRadius:8,border:"1px solid "+T.border,objectFit:"cover"}}/>}
                        </div>
                      ))}
                    </div>
                  )}
                  {a.extras&&a.extras.some(e=>e.link||e.photo)&&(
                    <div>
                      <div style={{fontWeight:700,fontSize:13,marginBottom:8}}>📌 기타 ({a.extras.filter(e=>e.link||e.photo).length}건)</div>
                      {a.extras.map((e,i)=>(e.link||e.photo)&&(
                        <div key={i} style={{marginBottom:10}}>
                          {e.link&&<div style={{fontSize:13,marginBottom:4}}><a href={e.link} target="_blank" rel="noreferrer" style={{color:T.pc,wordBreak:"break-all"}}>{e.link}</a></div>}
                          {e.photo&&<img src={e.photo} alt="" style={{maxWidth:160,maxHeight:120,borderRadius:8,border:"1px solid "+T.border,objectFit:"cover"}}/>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </>)}
        </>)}
        {atab==="missions"&&(<>
          <div style={{...S.card,border:"2px solid "+T.mission}}>
            <div style={{...S.h2,color:T.mission}}><Target size={16} style={{verticalAlign:-3,marginRight:6}}/>튼특미션 설정 <span style={{fontWeight:400,fontSize:12,color:T.muted}}>(라루피·라루피시크릿 공통)</span></div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}>
                <div onClick={()=>setMissionSettingForm(s=>({...s,isOpen:!s.isOpen}))}
                  style={{width:36,height:20,borderRadius:10,background:missionSettingForm.isOpen?T.mission:"#CCC",position:"relative",transition:"all 0.2s",cursor:"pointer"}}>
                  <div style={{width:16,height:16,borderRadius:8,background:"#fff",position:"absolute",top:2,left:missionSettingForm.isOpen?18:2,transition:"all 0.2s"}}/>
                </div>
                <span style={{fontSize:13,fontWeight:700,color:missionSettingForm.isOpen?T.mission:T.muted}}>{missionSettingForm.isOpen?"미션 오픈":"미션 클로즈"}</span>
              </label>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <div style={{flex:1}}>
                <label style={S.lbl}>미션 제품명</label>
                <input style={{...S.inp,marginBottom:0}} placeholder="예: 튼특크림" value={missionSettingForm.prodName||""} onChange={e=>setMissionSettingForm(s=>({...s,prodName:e.target.value}))} />
              </div>
              <div style={{flex:1}}>
                <label style={S.lbl}>마감일</label>
                <input type="date" style={{...S.inp,marginBottom:0}} value={missionSettingForm.deadline||""} onChange={e=>setMissionSettingForm(s=>({...s,deadline:e.target.value}))} />
              </div>
            </div>
            <div style={{marginBottom:8}}>
              <label style={S.lbl}>공개 대상</label>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                {[["all","전체 공개"],["selected","선택 회원만"]].map(([val,tlabel])=>(
                  <button key={val} onClick={()=>setMissionSettingForm(s=>({...s,targetMode:val}))}
                    style={{padding:"6px 14px",borderRadius:8,border:"2px solid "+(missionSettingForm.targetMode===val?T.mission:T.border),background:missionSettingForm.targetMode===val?T.missionL:T.card,color:missionSettingForm.targetMode===val?T.mission:T.muted,fontWeight:700,fontSize:12,cursor:"pointer"}}>
                    {tlabel}
                  </button>
                ))}
              </div>
              {missionSettingForm.targetMode==="selected"&&(<>
                <MissionTargetPicker setting={missionSettingForm} setSetting={setMissionSettingForm} supps={supps} />
                <div style={{background:"#FAFAFA",borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:12,fontWeight:700,color:T.muted}}>📊 엑셀로 대상자 일괄 추가</div>
                    <button onClick={downloadMissionTargetTemplate} style={S.btn(T.missionL,T.mission,true)}><Download size={13} style={{verticalAlign:-2,marginRight:4}}/>양식</button>
                  </div>
                  <label style={{display:"block",border:"1.5px dashed "+T.border,borderRadius:8,padding:"10px",textAlign:"center",cursor:"pointer",fontSize:12,color:T.muted,background:"#fff",marginBottom:8}}>
                    📂 엑셀 파일 선택 (기수, 닉네임 컬럼)
                    <input type="file" accept=".xlsx,.xls" style={{display:"none"}} onChange={e=>e.target.files[0]&&handleMissionExcelUpload(e.target.files[0])} />
                  </label>
                  {missionExcelErr&&<div style={{color:"#C0392B",fontSize:12,marginBottom:8}}>{missionExcelErr}</div>}
                  {missionExcelPreview.length>0&&(<>
                    <div style={{maxHeight:140,overflowY:"auto",border:"1px solid "+T.border,borderRadius:8,marginBottom:8}}>
                      {missionExcelPreview.map((p,i)=>(
                        <div key={i} style={{padding:"6px 10px",borderBottom:"1px solid "+T.border,fontSize:12,display:"flex",gap:8,alignItems:"center"}}>
                          <span style={{color:T.muted}}>{i+1}</span>
                          <span style={{fontWeight:700}}>{p.gen}</span><span>{p.nick}</span>
                          {p.suppId?<span style={{color:T.mission,fontSize:11}}>✔ 매칭됨{p.grade?" ("+GN[p.grade]+")":""}</span>:<span style={{color:"#C0392B",fontSize:11}}>✕ 회원 없음</span>}
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={applyMissionExcelTargets} style={{...S.btn(T.mission),flex:1}}>✅ {missionExcelPreview.filter(p=>p.suppId).length}명 추가</button>
                      <button onClick={()=>setMissionExcelPreview([])} style={S.btn("#EEE8E0",T.text)}>취소</button>
                    </div>
                  </>)}
                </div>
              </>)}
            </div>
            <button onClick={saveMissionSetting} style={{...S.btn(T.mission,undefined,true),width:"100%",marginTop:8}}>
              미션 설정 저장
            </button>
            {missionSettingMsg&&<div style={{textAlign:"center",fontSize:13,fontWeight:700,color:T.mission,marginTop:8}}>{missionSettingMsg}</div>}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <span style={S.h2}><ClipboardList size={16} style={{verticalAlign:-3,marginRight:6}}/>미션 현황</span>
            <select value={missionGradeFilter} onChange={e=>setMissionGradeFilter(e.target.value)} style={S.sel}>
              <option value="전체">전체 등급</option>
              <option value={G.L}>라루피</option>
              <option value={G.S}>라루피시크릿</option>
            </select>
            <button onClick={loadAllMissions} style={S.btn("#EEE8E0",T.text,true)}>새로고침</button>
          </div>
          <div style={{display:"flex",background:"#F0EBE4",borderRadius:10,padding:3,marginBottom:14}}>
            {[["all","전체"],["submitted","⏳검토중"],["approved","✅승인"],["rejected","❌반려"]].map(([val,label])=>{
              const cnt=allMissions.filter(m=>(missionGradeFilter==="전체"||m.grade===missionGradeFilter)&&(val==="all"||m.status===val)).length;
              return (
                <button key={val} onClick={()=>setMissionSubTab(val)}
                  style={{flex:1,padding:"7px 2px",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:11,background:missionSubTab===val?T.card:"transparent",color:missionSubTab===val?T.mission:T.muted,boxShadow:missionSubTab===val?"0 1px 4px rgba(0,0,0,0.1)":"none"}}>
                  {label} {cnt>0&&<span style={{fontSize:10,background:missionSubTab===val?T.missionL:"transparent",borderRadius:4,padding:"1px 4px"}}>{cnt}</span>}
                </button>
              );
            })}
          </div>
          {missionActionMsg&&<div style={{padding:"10px 14px",background:"#E8F5E9",borderRadius:10,marginBottom:12,fontSize:13,color:"#2E7D32",fontWeight:600}}>{missionActionMsg}</div>}
          {loadingMissions&&<div style={{textAlign:"center",padding:40,color:T.muted}}>불러오는 중...</div>}
          {!loadingMissions&&(()=>{
            const filtered=allMissions.filter(m=>(missionGradeFilter==="전체"||m.grade===missionGradeFilter)&&(missionSubTab==="all"||m.status===missionSubTab));
            if(filtered.length===0) return <div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>해당 항목이 없습니다.</div>;
            return filtered.map((m,idx)=>(
              <div key={m.suppId+idx} style={{...S.card,border:m.status==="rejected"?"2px solid #C0392B":m.status==="approved"?"2px solid #2E7D32":"2px solid #E0B97A"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14}}>{m.suppName}</div>
                    <div style={{display:"flex",gap:6,marginTop:4,alignItems:"center"}}>
                      <span style={S.tag(m.grade)}>{GN[m.grade]}</span>
                      <MissionBadge status={m.status}/>
                      {m.submittedAt&&<span style={{fontSize:11,color:T.muted}}>{m.submittedAt}</span>}
                    </div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    {m.status!=="approved"&&(
                      <button onClick={()=>approveMission(m)} style={{...S.btn("#2E7D32",undefined,true),padding:"6px 12px"}}>✅ 승인</button>
                    )}
                    {m.status!=="rejected"&&(
                      <button onClick={()=>setRejectTarget(m)} style={{...S.btn("#C0392B",undefined,true),padding:"6px 12px"}}>❌ 반려</button>
                    )}
                  </div>
                </div>
                {m.status==="rejected"&&m.rejectedReason&&(
                  <div style={{background:"#FDECEA",borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:12,color:"#C0392B"}}>
                    반려 사유: {m.rejectedReason}
                  </div>
                )}
                <div style={{fontSize:12,fontWeight:700,color:T.muted,marginBottom:8}}>바이럴 제출 내역</div>
                {(m.virals||[]).map((v,i)=>(v.link||v.photo)&&(
                  <div key={i} style={{marginBottom:10,paddingBottom:10,borderBottom:"1px solid "+T.border}}>
                    <div style={{fontSize:11,color:T.muted,marginBottom:4}}>바이럴 {i+1}</div>
                    {v.link&&<div style={{fontSize:13,marginBottom:4}}><a href={v.link} target="_blank" rel="noreferrer" style={{color:T.pc,wordBreak:"break-all"}}>{v.link}</a></div>}
                    {v.photo&&<img src={v.photo} alt="" style={{maxWidth:160,maxHeight:120,borderRadius:8,border:"1px solid "+T.border,objectFit:"cover"}}/>}
                  </div>
                ))}
              </div>
            ));
          })()}
        </>)}
        {atab==="inquiries"&&(<>
          <div style={{display:"flex",background:"#F0EBE4",borderRadius:10,padding:4,marginBottom:16}}>
            {[["received","받은 문의"],["sent","보낸 메시지"]].map(([id,label])=>(
              <button key={id} onClick={()=>{setIqSubTab(id);if(id==="sent"){setSelDmThread(null);loadAllDmThreads();}else{setSelInquiry(null);}}}
                style={{flex:1,padding:"8px 0",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,background:iqSubTab===id?T.card:"transparent",color:iqSubTab===id?T.pc:T.muted,boxShadow:iqSubTab===id?"0 1px 4px rgba(0,0,0,0.1)":"none"}}>
                {label}
              </button>
            ))}
          </div>
          {iqSubTab==="received"&&(<>
            {!selInquiry?(<>
              <div style={{fontWeight:700,fontSize:15,marginBottom:12}}>
                💬 전체 문의 ({allInquiries.length}건)
                <button onClick={loadAllInquiries} style={{...S.btn("#EEE8E0",T.text,true),marginLeft:10}}>새로고침</button>
              </div>
              {loadingIq?<div style={{textAlign:"center",padding:40,color:T.muted}}>불러오는 중...</div>
                :allInquiries.length===0?<div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>문의 내역이 없습니다.</div>
                :allInquiries.map(iq=>(
                  <div key={iq.id} onClick={()=>{setSelInquiry(iq);setReplyText(iq.reply||"");}}
                    style={{...S.card,cursor:"pointer",borderLeft:"3px solid "+(iq.reply?T.pc:"#E0B97A"),padding:"12px 16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{iq.title}</div>
                        <div style={{fontSize:12,color:T.muted}}>{iq.suppName}&nbsp;<span style={S.tag(iq.grade)}>{GN[iq.grade]}</span></div>
                        <div style={{fontSize:11,color:T.muted,marginTop:4}}>{iq.date}</div>
                      </div>
                      <span style={{fontSize:11,padding:"3px 10px",borderRadius:10,fontWeight:700,background:iq.reply?T.pcL:"#FEF6E4",color:iq.reply?T.pc:"#B7860B",whiteSpace:"nowrap"}}>{iq.reply?"답변완료":"미답변"}</span>
                    </div>
                  </div>
                ))}
            </>):(<>
              <button onClick={()=>{setSelInquiry(null);setReplyText("");setReplyMsg("");}} style={{...S.btn("#EEE8E0",T.text,true),marginBottom:14}}>← 목록</button>
              <div style={S.card}>
                <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>{selInquiry.title}</div>
                <div style={{fontSize:12,color:T.muted,marginBottom:12}}>{selInquiry.suppName}&nbsp;<span style={S.tag(selInquiry.grade)}>{GN[selInquiry.grade]}</span>&nbsp;·&nbsp;{selInquiry.date}</div>
                <div style={{fontSize:14,lineHeight:1.7,whiteSpace:"pre-wrap",padding:12,background:"#F9F6F2",borderRadius:8}}>{selInquiry.content}</div>
              </div>
              <div style={S.card}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>💬 관리자 답변</div>
                <textarea style={{...S.inp,minHeight:100,resize:"vertical"}} value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="답변 내용 입력"/>
                <button onClick={sendReply} style={{...S.btn(T.pc),width:"100%"}}>답변 등록</button>
                {replyMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:T.pc}}>{replyMsg}</div>}
              </div>
            </>)}
          </>)}
          {iqSubTab==="sent"&&(<>
            <div style={S.card}>
              <div style={S.h2}><Send size={16} style={{verticalAlign:-3,marginRight:6}}/>회원에게 메시지 보내기</div>
              <label style={S.lbl}>받는 회원</label>
              {dmSuppTarget?(
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:T.pcL,borderRadius:8,marginBottom:10}}>
                  <span style={{fontWeight:700,fontSize:13,color:T.pc}}>{dmSuppTarget.gen} · {dmSuppTarget.nick}</span>
                  <button onClick={()=>setDmSuppTarget(null)} style={S.btn("#EEE8E0",T.text,true)}>변경</button>
                </div>
              ):(<>
                <input style={S.inp} placeholder="기수 또는 닉네임으로 검색" value={dmSuppSearch} onChange={e=>setDmSuppSearch(e.target.value)} />
                {dmSuppSearch.trim().length>=1&&(()=>{
                  const q=dmSuppSearch.trim().toLowerCase();
                  const matches=supps.filter(s=>s.nick.toLowerCase().includes(q)||s.gen.toLowerCase().includes(q)).slice(0,6);
                  if(matches.length===0) return <div style={{fontSize:12,color:T.muted,padding:"6px 0"}}>검색 결과가 없습니다.</div>;
                  return matches.map(s=>(
                    <div key={s.id} onClick={()=>{setDmSuppTarget(s);setDmSuppSearch("");}} style={{padding:"8px 12px",borderRadius:8,cursor:"pointer",fontSize:13,border:"1px solid "+T.border,marginBottom:6,display:"flex",justifyContent:"space-between"}}>
                      <span>{s.gen} · {s.nick}</span><span style={S.tag(s.grade)}>{GN[s.grade]}</span>
                    </div>
                  ));
                })()}
              </>)}
              <label style={S.lbl}>제목</label><input style={S.inp} placeholder="메시지 제목" value={dmForm.title} onChange={e=>setDmForm(f=>({...f,title:e.target.value}))} />
              <label style={S.lbl}>내용</label><textarea style={{...S.inp,minHeight:100,resize:"vertical"}} placeholder="메시지 내용" value={dmForm.content} onChange={e=>setDmForm(f=>({...f,content:e.target.value}))} />
              <button onClick={sendAdminDm} disabled={dmSendSaving} style={{...S.btn(T.pc),width:"100%",opacity:dmSendSaving?0.7:1}}>{dmSendSaving?"전송 중...":"📨 메시지 전송 (로그인 시 팝업)"}</button>
              {dmSendMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:T.pc}}>{dmSendMsg}</div>}
            </div>
            <div style={{fontWeight:700,fontSize:14,marginBottom:10}}>
              보낸 메시지 내역 ({allDmThreads.length}건)
              <button onClick={loadAllDmThreads} style={{...S.btn("#EEE8E0",T.text,true),marginLeft:8}}>새로고침</button>
            </div>
            {!selDmThread?(
              loadingDmThreads?<div style={{textAlign:"center",padding:40,color:T.muted}}>불러오는 중...</div>
              :allDmThreads.length===0?<div style={{...S.card,textAlign:"center",color:T.muted,padding:32}}>보낸 메시지가 없습니다.</div>
              :allDmThreads.map(d=>{
                const last=d.messages[d.messages.length-1];
                const unread=last?.from==="supporter"&&!d.adminRead;
                return (
                  <div key={d.id} onClick={()=>openDmThread(d)} style={{...S.card,cursor:"pointer",borderLeft:"3px solid "+(unread?"#C0392B":T.pc),padding:"12px 16px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:8}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{d.title}</div>
                        <div style={{fontSize:12,color:T.muted}}>{d.suppName}&nbsp;<span style={S.tag(d.grade)}>{GN[d.grade]}</span></div>
                        <div style={{fontSize:12,color:T.muted,marginTop:4,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{last?.from==="admin"?"나: ":"회원: "}{last?.text}</div>
                      </div>
                      {unread&&<span style={{fontSize:11,padding:"3px 10px",borderRadius:10,fontWeight:700,background:"#FDECEA",color:"#C0392B",whiteSpace:"nowrap"}}>답장옴</span>}
                    </div>
                  </div>
                );
              })
            ):(<>
              <button onClick={()=>setSelDmThread(null)} style={{...S.btn("#EEE8E0",T.text,true),marginBottom:14}}>← 목록</button>
              <div style={S.card}>
                <div style={{fontWeight:800,fontSize:15,marginBottom:6}}>{selDmThread.title}</div>
                <div style={{fontSize:12,color:T.muted,marginBottom:14}}>{selDmThread.suppName}&nbsp;<span style={S.tag(selDmThread.grade)}>{GN[selDmThread.grade]}</span></div>
                {selDmThread.messages.map((m,i)=>(
                  <div key={i} style={{marginBottom:10,textAlign:m.from==="admin"?"right":"left"}}>
                    <div style={{display:"inline-block",maxWidth:"85%",padding:"9px 13px",borderRadius:10,fontSize:13,background:m.from==="admin"?T.pcL:"#F9F6F2",whiteSpace:"pre-wrap",textAlign:"left"}}>{m.text}</div>
                    <div style={{fontSize:10,color:T.muted,marginTop:2}}>{m.from==="admin"?"관리자":"회원"} · {m.date}</div>
                  </div>
                ))}
              </div>
              <div style={S.card}>
                <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>💬 답장하기</div>
                <textarea style={{...S.inp,minHeight:90,resize:"vertical"}} value={dmAdminReplyText} onChange={e=>setDmAdminReplyText(e.target.value)} placeholder="답장 내용 입력"/>
                <button onClick={sendAdminDmReply} style={{...S.btn(T.pc),width:"100%"}}>전송</button>
                {dmAdminReplyMsg&&<div style={{textAlign:"center",marginTop:8,fontSize:13,fontWeight:700,color:T.pc}}>{dmAdminReplyMsg}</div>}
              </div>
            </>)}
          </>)}
        </>)}
      </div>
    </div>
  );
  return null;
}
