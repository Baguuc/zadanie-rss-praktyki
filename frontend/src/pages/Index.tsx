import { useEffect } from "react";
import { useNavigate } from "react-router";

const Index = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/channels");    
    }, []);
    
    return <div />;
};

export default Index;