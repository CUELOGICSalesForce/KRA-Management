({   
    doInit: function(component,event,helper){
    var action = component.get('c.getdates');
    action.setCallback(this, function(response){
        var state = response.getState();
        if(state === 'SUCCESS' && component.isValid()){
            var dropdown_year=['None'];
            var yearname;
            var year = response.getReturnValue();
            console.log(year);
             for(let i=0;i<year.length;i++){
                    yearname=year[i].Appraisal_Cycle__r.Name;
                     console.log(yearname)
                    if(!(dropdown_year.includes(yearname))){
                           dropdown_year.push(yearname);
                    }
                   }
               console.log(dropdown_year);
             component.set("v.years", dropdown_year);
        }else{
            alert('ERROR...');
        }
    });
    $A.enqueueAction(action);
    
},
callEditComp : function(component, event, helper){
    var evt = $A.get("e.force:navigateToComponent");
    var ctarget = event.currentTarget;
    var kraId = ctarget.dataset.value;
    console.log('pass:' +kraId )
    evt.setParams({
        componentDef  : "c:editkras" ,
        componentAttributes : {
            kraNameId :kraId 
        }
    });
       evt.fire();
},

RemoveRecord : function(component,event,helper){
var ctarget = event.currentTarget;
var kraNameId  = ctarget.dataset.value;
    console.log('pass:' +kraNameId );
    var action = component.get('c.RemoveKra');
    action.setParams({"removekraId":kraNameId });
    action.setCallback(this, function(response){
        var state = response.getState();
        if(state === 'SUCCESS' && component.isValid()){
           alert('Success!!!!!');
        }else{
            alert('ERROR...');
        }
    });
    $A.enqueueAction(action);
},
changeStatus : function(component, event, helper) {
        var label = event.getSource().get("v.label");
        console.log(label);
        var kraId = event.getSource().get("v.name")
        console.log(kraId);
        if(label == 'Enabled') {
            var action = component.get('c.Kradisable');
            action.setParams({"disablekraId":kraId}); 
            event.getSource().set("v.label","Disabled");
            $A.enqueueAction(action);
        } else {
            var action = component.get('c.Kraenable');
            action.setParams({"enablekraId":kraId});
            event.getSource().set("v.label","Enabled");
            $A.enqueueAction(action);          
        }
},
onChangeVal:function (component, event, helper) {
    var year=document.getElementById("year-picklist");
     var particular_year=year.options[year.selectedIndex].value  
      console.log(particular_year);	
     var action = component.get("c.getKras");
    action.setParams({"year":particular_year});
    action.setCallback(this, function(response){
        var state = response.getState();
        if(state === 'SUCCESS' && component.isValid()){
        var KraList = response.getReturnValue();
         var listOfKras = [];
            var count=0;
            var roleName;
            var rolesAndKras = response.getReturnValue();
            console.log(rolesAndKras);
            for(var key in rolesAndKras){
                    console.log(rolesAndKras[key]);
                       roleName=key;
                    if(rolesAndKras[key] && roleName==key){
                    for(var value in rolesAndKras[key])
                        count=count+1;
                    listOfKras.push({value:rolesAndKras[key], key:key+" "+count});
                    }
                    count=0;
             }
            console.log(listOfKras);
             component.set("v.kraList", listOfKras);
        }else{
            alert('ERROR...');
        }
    });
    $A.enqueueAction(action);
  }

 
    
     
})