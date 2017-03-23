//Spell
function Spell(name, cost, description){
  this.name = name;
  this.cost = cost;
  this.description = description;
}

  Spell.prototype.getDetails = function(){
    return this.name + '|' + this.cost + '|' + this.description;
};

function DamageSpell(name, cost, damage, description){
  Spell.call(this, name, cost, description);
  this.damage = damage;
}

  DamageSpell.prototype = Object.create(Spell.prototype, {
    constructor: DamageSpell
  });

//Spellcaster
function Spellcaster(name, health, mana){
  this.name = name;
  this.health = health;
  this.mana = mana;
  this.isAlive = true;
}

  Spellcaster.prototype.inflictDamage = function(damage){
    this.health -= damage;
    if(this.health <= 0){
      this.health =0;
      this.isAlive = false;
    }
  };

  Spellcaster.prototype.spendMana = function(cost){
    if(cost > this.mana){
      return false;
    }else{
      this.mana -= cost;
      return true;
    }
  };

  Spellcaster.prototype.invoke = function(spell, target){
    if(spell instanceof Spell === false){
      return false;
    }

    if(spell instanceof DamageSpell){
      if(this.mana > spell.cost && target instanceof Spellcaster){
        this.spendMana(spell.cost);
        target.inflictDamage(spell.damage);
        return true;
      }else{
        return false;
      }
    }

    if(spell instanceof Spell){
      if(this.mana >= spell.cost){
        this.spendMana(spell.cost);
        return true;
      }else{
        return false;
      }
    }
};