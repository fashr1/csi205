import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* <h1 className="home-Htitle">Home</h1> */}
      <div className="home-title-container">
        <span className="home-Htitle">
          HOME
        </span>
      </div>
      <img src="human.jpg" />
      <h3 className="home-name">67133473 นายประสบการณ์ ผมพันธ์</h3>
      <h3 className="home-major">คณะ เทคโนโลยีสารสนเทศ <br />สาขาวิชา วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์ <br />กำลังศึกษาที่มหาวิทยาลัยศรีปทุม</h3>
      <h3 className="home-caption">  "ชื่อเล่น เฟชร อายุ 19 ปี"</h3>
    </div>
  );
}

export default Home;
