import { CardForPanel } from "../components/CardForPanel"
import { TypeList } from "../components/TypeList"


export const PanelPage = () => {
    return (
        <div className="panel">
            <div className="blank"></div>
        <div className="btn grey lighten-2 grey-text text-darken-4 btnAddPanel">Добавить</div>
                    <TypeList />
                    <div className="cardPanel">
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                        <CardForPanel />
                    </div>
                    
</div>
     
    )
}