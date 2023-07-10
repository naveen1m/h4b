// show queue and doctor and some submited information
import { Button } from "@mantine/core";

import { useNavigate } from "react-router-dom";

const QueuePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Wait here... Patient is in queue!!!</h1>
            <Button ml='30%' size="md" onClick={() => { navigate('/meeting') }} >Join</Button>
        </div>
    )
}
export default QueuePage;