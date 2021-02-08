(()=>{

    let yOffset =0;
    let prevScrollHeight=0; //현재 스크롤 위치
    let currentScene=0; //현재 활성화된(눈 앞에보고있는) 씬
    const sceneInfo =[
        {   
            //0
            type:'sticky',
            heightNum:5,
            scrollHeight:0,
            objs:{
                container:document.querySelector('#scroll-section-0')
            }

        },
        {   //1
            type:'normal',
            heightNum:5,
            scrollHeight:0, 
            objs:{
                container:document.querySelector('#scroll-section-1')
            }

        },
        {   //2
            type:'sticky',
            heightNum:5,
            scrollHeight:0, 
            objs:{
                container:document.querySelector('#scroll-section-2')
            }

        },
        {   //3
            type:'sticky',
            heightNum:5,
            scrollHeight:0, 
            objs:{
                container:document.querySelector('#scroll-section-3')
            }

        }
    ];
    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for(let i =0; i<sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum*window.innerHeight;
            sceneInfo[i].objs.container.style.height =`${sceneInfo[i].scrollHeight}px`
        }
        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for(let i =0; i<sceneInfo.length;i++){
            totalScrollHeight+=sceneInfo[i].scrollHeight;
            if(totalScrollHeight >=yOffset){
                currentScene=i;
                break
            }            
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
    }
    function scrollLoop(){
        prevScrollHeight=0;
        for(let i=0; i<currentScene.length; i++){
            prevScrollHeight+=sceneInfo[i].scrollHeight;

        }

        if(yOffset>prevScrollHeight+ sceneInfo[currentScene].scrollHeight){
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);

        }
        if(yOffset <prevScrollHeight){
            if (currentScene===0) return; //브라우저 바운스 효과로 인해 마이너스 되는 것을 방지
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);

        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);
        
    }
    window.addEventListener('resize',setLayout);
    window.addEventListener('scroll',()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    window.addEventListener('load',setLayout);
    window.addEventListener('resize',setLayout);

})();