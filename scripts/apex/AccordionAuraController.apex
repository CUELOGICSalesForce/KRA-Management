public class AccordionAuraController {
    @AuraEnabled
    public static Map<String,List<createKra__c>> getKras(String year){
        List<createKra__c> KraList =[select Role__r.Name,Name,Id,Appraisal_Cycle__r.Name from createKra__c];
        list<createKra__c> kraname=new list<createKra__c>();
        Map<String,List<createKra__c>> RolesKra =new Map<String,List<createKra__c>>();
        String roleName;
        for(createKra__c role:KraList){
            roleName=role.Role__r.Name;
            kraname=[select Name,id,Status__c,Appraisal_Cycle__r.Name from createKra__c where (Role__r.Name=:roleName AND Appraisal_Cycle__r.Name=:year)];
           	RolesKra.put(roleName,kraname);
        }
        return RolesKra;
    }
    @AuraEnabled
    public static list<createKra__c> getdates(){
        list<createKra__c> dates = new list<createKra__c>();
        for(createKra__c d : [SELECT Appraisal_Cycle__r.Name From createKra__c]){
            dates.add(d);
        }
     	return dates;
    }
    @AuraEnabled
    public static void RemoveKra(String removekraId){
       system.debug(removekraId);
       delete [SELECT  Name,Role__r.Name,Appraisal_Cycle__r.Name,Allow_Goals__c,Status__c,KRA_description__c,KRA_weightage__c FROM createKra__c
                         WHERE Id = :removekraId]; 
    }
     @AuraEnabled
    public static void Kradisable(String disablekraId){
        createKra__c disabledKra = [select Status__c from createKra__c where id=:disablekraId];
        disabledKra.Status__c='Disabled';
        update disabledKra;
   }
   @AuraEnabled
    public static void  Kraenable(String enablekraId){
        createKra__c enabledKra = [select Status__c from createKra__c where id=:enablekraId];
        enabledKra.Status__c='Enabled';
        update enabledKra;
    }
}