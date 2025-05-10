import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import back from "../../../assets/images/arrow-left.svg";
import "./InquiriesOpen.css";
import api from "../../../api/api";
import TopInfoPanel from "../../../components/InquiryTopInfoPanel/TopInfoPanel";

const InquiriesOpen = () => {

    const { id } = useParams();
    const [inquiryData, setInquiryData] = React.useState(null);

    useEffect(() => {
        const fetchInquiry = async () => {
            try {
                const response = await api.get(`/inquiries/${id}`);
                setInquiryData(response.data.inquiry);
                console.log(response.data.inquiry);
            } catch (error) {
                console.error("Failed to fetch inquiry:", error);
            }
        };

        fetchInquiry();
    }, [id]);

    return (
        <div className="dashboard-container">
            <div className="back-button-container">
                <img src={back}></img>
                <Link to="/henvendelser"><p>Tilbake til henveldelser</p></Link>
            </div>

            <TopInfoPanel data={inquiryData} />
        </div>
    );
};

export default InquiriesOpen;
