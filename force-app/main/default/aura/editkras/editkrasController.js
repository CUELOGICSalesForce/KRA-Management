({
	doInit: function(component,event,helper) {
        var kraId=component.get("{!v.kraNameId}");
        console.log(kraId);
        var action = component.get('c.getDataOfKra');
        action.setParams({"editkraId":kraId});

        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.kra', response.getReturnValue());
            }else{
                alert('ERROR...');
            }
        });
        $A.enqueueAction(action);
    
    },
    handleEdit :function(component,event,helper){
     // var kraDetail=component.get("{!v.kra}");
      var kraId=component.get("{!v.kraNameId}");
      var name=document.getElementById("kraName").value;
      var description=document.getElementById("KraDescription").value;
      var weightage=document.getElementById("KraWeightage").value;
      
      var action = component.get('c.saveKra');
      action.setParams({"kraname":name,"kradescription":description,"kraweightage":weightage,
                           "editkraId":kraId});

        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()){
                component.set('v.kra', response.getReturnValue());

                
               alert('Success!!!!!')
            }else{
                alert('ERROR...');
            }
        });
        $A.enqueueAction(action);
        

}
  
    
})