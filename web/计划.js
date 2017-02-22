//

//申精区 批量选中"已申请"
smjq('th.common').has('em>a:contains("已通过")').prev('.o').find('input').each(function(){this.click()});

//思路拓展:进而可以实现,用于每个可执行区块的批量选中