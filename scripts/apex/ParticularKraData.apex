public class ParticularKraData {
    @AuraEnabled
	 public static createKra__c getDataOfKra(String editkraId){
        createKra__c displaykra = [SELECT Name,KRA_description__c,KRA_weightage__c From createKra__c where Id= :editkraId];
        return displaykra;
	}
    @AuraEnabled
    public static createKra__c saveKra(string kraname,string kradescription,integer kraweightage,string editkraId){
        system.debug(kraname);
        createKra__c updatekra = [SELECT Name,KRA_description__c,KRA_weightage__c From createKra__c where Id= :editkraId];
		updatekra.Name=kraname;
        updatekra.KRA_description__c=kradescription;
        updatekra.KRA_weightage__c=kraweightage;
        update updatekra;
        return updatekra;
    }
    
}