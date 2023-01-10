import DragResizeContainer from 'react-drag-resize';
import "./Lineitem.css"

const LineitemTest = ()=>{

    const layout = [{ key: 'test', x: 0, y: 0, width: 200, height: 100}]

    const canResizable = (isResize) => {
        return { top: isResize, right: isResize, bottom: isResize, left: isResize, topRight: isResize, bottomRight: isResize, bottomLeft: isResize, topLeft: isResize };
    };

    return (

        <DragResizeContainer
            className='resize-container'
            resizeProps={{ 
                minWidth: 10, 
                minHeight: 10, 
                enable: canResizable("") 
            }}
        >
            {layout.map((single) => {
            return (
                <div key={single.key} className='child-container size-auto border'>text test</div>
            );
            })}
        </DragResizeContainer>

    )

}

export default LineitemTest;
