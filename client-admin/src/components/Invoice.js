import React, { useState, useEffect, useCallback } from "react";
import "../css/Invoice.css";
import {
    Table,
    Row,
    Col,
    Tooltip,
    User,
    Text,
    Button,
} from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { IconButton } from "./IconButton";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
// call backend
import Axios from "axios";
import { IP } from "../constants/constants";

const Invoice = () => {
    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        Axios.get(`${IP}/getallinvoice`)
            .then((res) => {
                setInvoices(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const columns = [
        { name: "ID", uid: "id" },
        { name: "NAME", uid: "name" },
        { name: "CREATE AT", uid: "createat" },
        { name: "TOTAL", uid: "total" },
        { name: "FEESHIP", uid: "feeship" },
        { name: "DISCOUNT", uid: "discount" },
        { name: "CHECKOUT", uid: "thanhtoan" },
        { name: "STATUS", uid: "status" },
        { name: "BILL", uid: "bill" },
        { name: "ACTIONS", uid: "actions" },
    ];
    const users = invoices.map((invoice) => {
        return {
            id: invoice.invoice_id,
            cus_name: invoice.cus_name,
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            cus_email: invoice.cus_email,
            invoice_total: invoice.invoice_total,
            invoice_status: invoice.invoice_status,
            invoice_createddate: new Date(
                invoice.invoice_createddate
            ).toLocaleDateString(),
            invoice_feeship: invoice.invoice_feeship,
            invoice_discount: invoice.invoice_discount,
            invoice_bill: invoice.invoice_bill,
            invoice_statusdelivery: invoice.invoice_statusdelivery,
        };
    });

    const [selected, setSelected] = React.useState(new Set([""]));

    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    const Check = (id) => {
        if (id === 0) {
            setSelected(new Set(["Ch??a thanh to??n"]));
        } else if (id === 1) {
            setSelected(new Set(["??ang chu???n b???"]));
        } else if (id === 2) {
            setSelected(new Set(["??ang giao h??ng"]));
        } else if (id === 3) {
            setSelected(new Set(["???? giao h??ng"]));
        }
        // id === 0
        //     ? setSelected(new Set(["Ch??a thanh to??n"]))
        //     : id === 1
        //     ? setSelected(new Set(["??ang chu???n b???"]))
        //     : id === 2
        //     ? setSelected(new Set(["??ang giao h??ng"]))
        //     : id === 3
        //     ? setSelected(new Set(["???? giao h??ng"]))
        //     : setSelected(new Set([""]));
    };

    const closeHandler = useCallback((id, status) => {
        Axios.put(`${IP}/updatestatusdelivery`, {
            invoice_statusdelivery: status,
            invoice_id: id,
        })
            .then((res) => {
                console.log(res.data.message);
                // setSelected(new Set(["Ch??a thanh to??n"]));
                // setInvoices(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderCell = (user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "id":
                return <div>{user.id}</div>;
            case "name":
                return (
                    <User
                        squared
                        src={user.avatar}
                        name={user.cus_name}
                        css={{ p: 0 }}
                    >
                        {user.cus_email}
                    </User>
                );
            case "createat":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {user.invoice_createddate}
                            </Text>
                        </Row>
                    </Col>
                );
            case "total":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {user.invoice_total} ??
                            </Text>
                        </Row>
                    </Col>
                );
            case "feeship":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {user.invoice_feeship} ??
                            </Text>
                        </Row>
                    </Col>
                );
            case "discount":
                return (
                    <Col>
                        <Row>
                            <Text b size={14} css={{ tt: "capitalize" }}>
                                {user.invoice_discount} ??
                            </Text>
                        </Row>
                    </Col>
                );
            case "thanhtoan":
                return (
                    <StyledBadge type={user.status}>
                        {user.invoice_status === 0
                            ? "Ch??a thanh to??n"
                            : "???? thanh to??n"}
                    </StyledBadge>
                );
            case "status":
                return (
                    <>
                        <Col>
                            <Row>
                                <StyledBadge type={user.status}>
                                    {user.invoice_statusdelivery === 0
                                        ? "Ch??a giao h??ng"
                                        : user.invoice_statusdelivery === 1
                                        ? "??ang chu???n b???"
                                        : user.invoice_statusdelivery === 2
                                        ? "??ang giao h??ng"
                                        : user.invoice_statusdelivery === 3
                                        ? "???? giao h??ng"
                                        : null}
                                </StyledBadge>
                            </Row>
                            <Row>
                                <Dropdown>
                                    <Dropdown.Button
                                        flat
                                        color="secondary"
                                        css={{ tt: "capitalize" }}
                                    >
                                        {selectedValue}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        aria-label="Single selection actions"
                                        color="secondary"
                                        disallowEmptySelection
                                        selectionMode="single"
                                        onLoad={(e) => {
                                            console.log("loaded");
                                            Check(user.invoice_statusdelivery);
                                        }}
                                        selectedKeys={selected}
                                        onSelectionChange={setSelected}
                                    >
                                        <Dropdown.Item key="Ch??a thanh to??n">
                                            <div
                                                onClick={() =>
                                                    closeHandler(user.id, 0)
                                                }
                                            >
                                                Ch??a thanh to??n
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item key="??ang chu???n b???">
                                            <div
                                                onClick={() =>
                                                    closeHandler(user.id, 1)
                                                }
                                            >
                                                ??ang chu???n b???
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item key="??ang giao h??ng">
                                            <div
                                                onClick={() =>
                                                    closeHandler(user.id, 2)
                                                }
                                            >
                                                ??ang giao h??ng
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item key="???? giao h??ng">
                                            <div
                                                onClick={() =>
                                                    closeHandler(user.id, 3)
                                                }
                                            >
                                                ???? giao h??ng
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Row>
                        </Col>
                    </>
                );
            case "bill":
                return (
                    <Col>
                        <Row>
                            <a href={user.invoice_bill}>
                                <Button>Xem bill</Button>
                            </a>
                        </Row>
                    </Col>
                );
            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Details">
                                <IconButton
                                    onClick={() =>
                                        console.log("View invoice", user.id)
                                    }
                                >
                                    <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip content="Edit status delivery">
                                <IconButton
                                    onClick={() =>
                                        console.log("Edit status", user.id)
                                    }
                                >
                                    <EditIcon size={20} fill="#979797" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                        <Col css={{ d: "flex" }}>
                            <Tooltip
                                content="Delete user"
                                color="error"
                                onClick={() =>
                                    console.log("Delete invoice", user.id)
                                }
                            >
                                <IconButton>
                                    <DeleteIcon size={20} fill="#FF0080" />
                                </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                );
            default:
                return cellValue;
        }
    };
    return (
        <Table
            aria-label="Example table with custom cells"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
            selectionMode="none"
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column
                        key={column.uid}
                        hideHeader={column.uid === "actions"}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={users}>
                {(item) => (
                    <Table.Row>
                        {(columnKey) => (
                            <Table.Cell>
                                {renderCell(item, columnKey)}
                            </Table.Cell>
                        )}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
};

export default Invoice;
