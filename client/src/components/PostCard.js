export default function Post({ userpost, img }) {
  return (
    <div className="posts">
      <div className="image">
        <img src={"http://localhost:4000/" + img} alt="reload"></img>
      </div>
      <div className="postdescription">{userpost}</div>
      <br />
      <br />
    </div>
  );
}
