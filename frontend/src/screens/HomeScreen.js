import React, { useState, useEffect } from "react";
import LineTo, { Line } from "react-lineto";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, Form } from "react-bootstrap";
import { listCables, addSplice } from "../actions/fiberActions";
import Select from "react-select";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const fiberNum = 3;
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const cableList = useSelector((state) => state.Cables);
  const { cables } = cableList;
  const [cable1, setCable1] = useState();
  const [cable2, setCable2] = useState();
  const [cable3, setCable3] = useState();

  const [cableOptions, setCableOptions] = useState([]);

  const [tube1, setTube1] = useState();
  const [tube2, setTube2] = useState();
  const [tube3, setTube3] = useState();


  const [lineList, setLineList] = useState(
    Array(fiberNum * 12).fill({ clicked: false })
  );

  useEffect(() => {
    dispatch(listCables());
  }, [lineList]);

  useEffect(() => {
    setCableOptions(
      cables.map((opt, i) => ({ label: opt.cableDescriptor, value: opt })),
    )
  }, [cables]);

  const handleClick = (id) => {
    setLineList(() => {
      const list = lineList.map((line, index) =>
        index === id
          ? line.clicked == true
            ? { clicked: false }
            : { clicked: true }
          : line
      );
      return list;
    });
  };

  const handleSelect = (e, i) => {
    if (i == 1) {
      setCable1(e);
      setTube1(e.value.tubes[0].color);
    }
    if (i == 2) {
      setCable2(e);
      setTube2(e.value.tubes[0].color);
    }
    if (i == 3) {
      setCable3(e);
      setTube3(e.value.tubes[0].color);
    }
  };


  const handleSplice = () => {
    const fiberList = lineList
      .map((e, i) => (e.clicked === true ? i + 1 : undefined))
      .filter((x) => x);
    const cableid =
      fiberList[0] < 13
        ? cable1.value
        : fiberList[0] < 25
        ? cable2.value
        : cable3.value;

    const cableid2 =
      fiberList[1] < 13
        ? cable1.value
        : fiberList[1] < 25
        ? cable2.value
        : cable3.value;

    const tubeid =
      fiberList[0] < 13 ? tube1 : fiberList[0] < 25 ? tube2 : tube3;
    const tubeid2 =
      fiberList[1] < 13 ? tube1 : fiberList[1] < 25 ? tube2 : tube3;

    dispatch(addSplice({ cableid, cableid2, fiberList, tubeid, tubeid2 }));
    setLineList(() => {
      const list = lineList.map((line) => (line.clicked = { clicked: false }));
      return list;
    });
  };


  const classes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

  return (
    <div className="grid-1">
      <div>
        <Select options={cableOptions} onChange={(e) => handleSelect(e, 1)} />
        {cable1 ? (
          <Form.Control
            value={tube1}
            as="select"
            onChange={(e) => setTube1(e.target.value)}
          >
            {cable1.value.tubes.map((x, i) => (
              <option key={i} value={x.color}>
                {x.color}
              </option>
            ))}
          </Form.Control>
        ) : (
          ""
        )}
      </div>

      <div className="grid-2">
        {classes.map((cl, i) => (
          <div
            key={i}
            className={
              cl == "A"
                ? "A"
                : cl == "B"
                ? "B"
                : cl == "C"
                ? "C"
                : cl == "D"
                ? "D"
                : cl == "E"
                ? "E"
                : cl == "F"
                ? "F"
                : cl == "G"
                ? "G"
                : cl == "H"
                ? "H"
                : cl == "I"
                ? "I"
                : cl == "J"
                ? "J"
                : cl == "K"
                ? "K"
                : "L"
            }
          >
            <Button
              variant="outline-primary"
              className={
                cl == "A"
                  ? "BL"
                  : cl == "B"
                  ? "OR"
                  : cl == "C"
                  ? "GRE"
                  : cl == "D"
                  ? "BRO"
                  : cl == "E"
                  ? "SL"
                  : cl == "F"
                  ? "WH"
                  : cl == "G"
                  ? "RD"
                  : cl == "H"
                  ? "BK"
                  : cl == "I"
                  ? "YL"
                  : cl == "J"
                  ? "VT"
                  : cl == "K"
                  ? "RS"
                  : "AQ"
              }
              onClick={() => {
                handleClick(i);
              }}
            ></Button>
          </div>
        ))}
      </div>

      <div>
        <div className="Splicer">Splice</div>
      </div>

      <div className="grid-4">
        {classes.map((cl, i) => (
          <div
            key={i}
            className={
              cl == "A"
                ? "AR"
                : cl == "B"
                ? "BR"
                : cl == "C"
                ? "CR"
                : cl == "D"
                ? "DR"
                : cl == "E"
                ? "ER"
                : cl == "F"
                ? "FR"
                : cl == "G"
                ? "GR"
                : cl == "H"
                ? "HR"
                : cl == "I"
                ? "IR"
                : cl == "J"
                ? "JR"
                : cl == "K"
                ? "KR"
                : "LR"
            }
          >
            <Button
              className={
                cl == "A"
                  ? "BL"
                  : cl == "B"
                  ? "OR"
                  : cl == "C"
                  ? "GRE"
                  : cl == "D"
                  ? "BRO"
                  : cl == "E"
                  ? "SL"
                  : cl == "F"
                  ? "WH"
                  : cl == "G"
                  ? "RD"
                  : cl == "H"
                  ? "BK"
                  : cl == "I"
                  ? "YL"
                  : cl == "J"
                  ? "VT"
                  : cl == "K"
                  ? "RS"
                  : "AQ"
              }
              variant="outline-primary"
              onClick={() => {
                handleClick(i + 12);
              }}
            ></Button>
          </div>
        ))}
      </div>

      <div>
        <Select options={cableOptions} onChange={(e) => handleSelect(e, 2)} />
        {cable2 ? (
          <Form.Control
            value={tube2}
            as="select"
            onChange={(e) => setTube2(e.target.value)}
          >
            {cable2.value.tubes.map((x, i) => (
              <option key={i} value={x.color}>
                {x.color}
              </option>
            ))}
          </Form.Control>
        ) : (
          ""
        )}
      </div>
      <div></div>
      <div></div>

      <div className="grid-3">
        {classes.map((cl, i) => (
          <div
            key={i}
            className={
              cl == "A"
                ? "AB"
                : cl == "B"
                ? "BB"
                : cl == "C"
                ? "CB"
                : cl == "D"
                ? "DB"
                : cl == "E"
                ? "EB"
                : cl == "F"
                ? "FB"
                : cl == "G"
                ? "GB"
                : cl == "H"
                ? "HB"
                : cl == "I"
                ? "IB"
                : cl == "J"
                ? "JB"
                : cl == "K"
                ? "KB"
                : "LB"
            }
          >
            <Button
              className={
                cl == "A"
                  ? "BL"
                  : cl == "B"
                  ? "OR"
                  : cl == "C"
                  ? "GRE"
                  : cl == "D"
                  ? "BRO"
                  : cl == "E"
                  ? "SL"
                  : cl == "F"
                  ? "WH"
                  : cl == "G"
                  ? "RD"
                  : cl == "H"
                  ? "BK"
                  : cl == "I"
                  ? "YL"
                  : cl == "J"
                  ? "VT"
                  : cl == "K"
                  ? "RS"
                  : "AQ"
              }
              variant="outline-primary"
              onClick={() => {
                handleClick(i + 24);
              }}
            ></Button>
          </div>
        ))}
      </div>
      <div></div>
      <Button onClick={handleSplice}>Splice</Button>
      <div></div>
      <div></div>

      <div>
        <Select options={cableOptions} onChange={(e) => handleSelect(e, 3)} />
        {cable3 ? (
          <Form.Control
            value={tube3}
            as="select"
            onChange={(e) => setTube3(e.target.value)}
          >
            {cable3.value.tubes.map((x, i) => (
              <option key={i} value={x.color}>
                {x.color}
              </option>
            ))}
          </Form.Control>
        ) : (
          ""
        )}
      </div>

      <div></div>
      <Button
        onClick={() => {
          navigate("/review/");
        }}
      >
        Finish
      </Button>

      {lineList.map(
        (line, i) =>
          line.clicked == true && (
            <div key={i}>
              {i < 12 ? (
                <LineTo
                  borderWidth={7}
                  to="Splicer"
                  delay={0}
                  from={
                    i == 0
                      ? "A"
                      : i == 1
                      ? "B"
                      : i == 2
                      ? "C"
                      : i == 3
                      ? "D"
                      : i == 4
                      ? "E"
                      : i == 5
                      ? "F"
                      : i == 6
                      ? "G"
                      : i == 7
                      ? "H"
                      : i == 8
                      ? "I"
                      : i == 9
                      ? "J"
                      : i == 10
                      ? "K"
                      : "L"
                  }
                  borderColor={
                    i == 0
                      ? "blue"
                      : i == 1
                      ? "orange"
                      : i == 2
                      ? "green"
                      : i == 3
                      ? "brown"
                      : i == 4
                      ? "#C0C2C9"
                      : i == 5
                      ? "black"
                      : i == 6
                      ? "red"
                      : i == 7
                      ? "black"
                      : i == 8
                      ? "yellow"
                      : i == 9
                      ? "violet"
                      : i == 10
                      ? "#E4A598"
                      : "aqua"
                  }
                ></LineTo>
              ) : (i >= 12) & (i < 24) ? (
                <LineTo
                  borderWidth={7}
                  to="Splicer"
                  delay={0}
                  from={
                    i == 12
                      ? "AR"
                      : i == 13
                      ? "BR"
                      : i == 14
                      ? "CR"
                      : i == 15
                      ? "DR"
                      : i == 16
                      ? "ER"
                      : i == 17
                      ? "FR"
                      : i == 18
                      ? "GR"
                      : i == 19
                      ? "HR"
                      : i == 20
                      ? "IR"
                      : i == 21
                      ? "JR"
                      : i == 22
                      ? "KR"
                      : "LR"
                  }
                  borderColor={
                    i == 12
                      ? "blue"
                      : i == 13
                      ? "orange"
                      : i == 14
                      ? "green"
                      : i == 15
                      ? "brown"
                      : i == 16
                      ? "#C0C2C9"
                      : i == 17
                      ? "black"
                      : i == 18
                      ? "red"
                      : i == 19
                      ? "black"
                      : i == 20
                      ? "yellow"
                      : i == 21
                      ? "violet"
                      : i == 22
                      ? "#E4A598"
                      : "aqua"
                  }
                ></LineTo>
              ) : i >= 24 ? (
                <LineTo
                  borderWidth={7}
                  to="Splicer"
                  delay={0}
                  from={
                    i == 24
                      ? "AB"
                      : i == 25
                      ? "BB"
                      : i == 26
                      ? "CB"
                      : i == 27
                      ? "DB"
                      : i == 28
                      ? "EB"
                      : i == 29
                      ? "FB"
                      : i == 30
                      ? "GB"
                      : i == 31
                      ? "HB"
                      : i == 32
                      ? "IB"
                      : i == 33
                      ? "JB"
                      : i == 34
                      ? "KB"
                      : "LB"
                  }
                  borderColor={
                    i == 24
                      ? "blue"
                      : i == 25
                      ? "orange"
                      : i == 26
                      ? "green"
                      : i == 27
                      ? "brown"
                      : i == 28
                      ? "#C0C2C9"
                      : i == 29
                      ? "black"
                      : i == 30
                      ? "red"
                      : i == 31
                      ? "black"
                      : i == 32
                      ? "yellow"
                      : i == 33
                      ? "violet"
                      : i == 34
                      ? "#E4A598"
                      : "aqua"
                  }
                ></LineTo>
              ) : (
                ""
              )}{" "}
            </div>
          )
      )}
    </div>
  );
}

export default HomeScreen;
