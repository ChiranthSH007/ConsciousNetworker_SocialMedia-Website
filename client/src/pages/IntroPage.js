import { memo } from "react";
import { Button } from "@chakra-ui/react";
export default function IntroPage() {
  return (
    <div style={{ border: "5px  red" }}>
      <div
        style={{
          border: "5px  black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "140px",
        }}
      >
        <div style={{ textAlign: "left", marginLeft: "1%" }}>
          <img
            src="/logoname-1@2x.png"
            maxWidth="100%"
            style={{ height: "110px" }}
          />
        </div>
        <div style={{ textAlign: "right", marginRight: "1%" }}>
          <Button
            style={{
              background:
                "linear-gradient(to bottom, #f89d8f 0%, #38609b 0.01%, #183154 100%)",
            }}
            className="button"
            variant="text"
            marginRight="20px"
            height={"50px"}
            width={"120px"}
            borderRadius={"30px"}
          >
            SIGN-UP
          </Button>
          <Button
            className="button1"
            variant="text"
            colorScheme="blue"
            height={"50px"}
            width={"120px"}
            borderRadius={"30px"}
            style={{
              background:
                "linear-gradient(to bottom, #f89d8f 0%, #38609b 0.01%, #183154 100%)",
            }}
          >
            LOGIN
          </Button>
        </div>
      </div>
      <div className="">
        <div
          className="introln1"
          style={{ marginBottom: "5%", marginTop: "5%" }}
        >
          <div className="intropageln1">
            <h1
              style={{
                color: "#183154",
                fontSize: "40px",
                marginRight: "20%",
                marginLeft: "5%",
              }}
            >
              We are a social network that enables you to connect with people
              who share your interests.
              <p
                style={{
                  /*marginLeft:'25%',*/ fontSize: "20px",
                  marginTop: "2%",
                }}
              >
                Looking to network with purpose and meaning?
                <br></br>Join The Conscious Networker - Where Mindful Networking
                Meets Meaningful Connections
                <br></br>Expand your network in a setting that promotes
                conscious living and real connections.
              </p>
            </h1>
          </div>
          <img
            style={{
              objectFit: "cover",
              margin: "0 auto",
              alignItems: "center",
              maxWidth: "100%",
              height: "350px",
              marginRight: "5%",
            }}
            alt=""
            src="/intro1-1@2x.png"
          />
        </div>
        <div className="">
          <div className="introln2" style={{ marginBottom: "5%" }}>
            <img
              style={{
                objectFit: "cover",
                margin: "0 auto",
                alignItems: "center",
                maxWidth: "100%",
                height: "350px",
                marginLeft: "5%",
              }}
              alt=""
              src="/people-1@2x.png"
            />
            <div className="intropageln2" style={{ alignItems: "center" }}>
              <h1
                style={{
                  paddingLeft: "60px",
                  color: "#183154",
                  fontSize: "40px",
                  marginLeft: "13%",
                }}
              >
                Discover a brand-new social media platform.
                <p
                  style={{
                    /*marginLeft:'25%',*/ fontSize: "20px",
                    marginTop: "2%",
                  }}
                >
                  We are the only social media site dedicated to assisting users
                  in connecting with others, sharing thoughtful ideas, planning
                  events, and celebrating life's new beginnings. We assist you
                  in locating groups where you can meet others who share your
                  interests and further your cause.
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1px solid red",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "90px",
            backgroundColor: "#151515",
          }}
        >
          <div style={{ textAlign: "left", marginLeft: "5%" }}>
            <img
              src="/logonamewhite-1@2x.png"
              maxWidth="100%"
              style={{ height: "80px" }}
            />
          </div>
          <div style={{ textAlign: "center", color: "white" }}>
            <p>© 2023 Designed by Team</p>
          </div>
          <div
            style={{ textAlign: "right", color: "white", marginRight: "5%" }}
          >
            <p style={{ color: "white", marginRight: "67%" }}>Contact Us:</p>

            <a
              style={{ color: "white" }}
              href="mailto:hello@theconsciousnetworker.com"
            >
              hello@theconsciousnetworker.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
