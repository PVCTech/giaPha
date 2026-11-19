export function getRelatedMembers(members, memberId) {
  const byId = new Map(members.map((member) => [member.id, member]))
  const selected = byId.get(memberId)
  const related = new Set()
  if (!selected) return related

  const add = (member) => {
    if (member) related.add(member.id)
  }
  const addPartner = (member) => {
    if (member?.idVoChon) add(byId.get(member.idVoChon))
    const reciprocalPartner = members.find((candidate) => candidate.idVoChon === member?.id)
    add(reciprocalPartner)
  }
  const addChildren = (parent) => {
    members.filter((member) => member.idBo === parent.id || member.idMe === parent.id).forEach(add)
  }
  const visitedDescendants = new Set()
  const addDescendants = (parent) => {
    if (visitedDescendants.has(parent.id)) return
    visitedDescendants.add(parent.id)
    members
      .filter((member) => member.idBo === parent.id || member.idMe === parent.id)
      .forEach((child) => {
        add(child)
        addPartner(child)
        addDescendants(child)
      })
  }

  add(selected)
  addPartner(selected)
  addDescendants(selected)

  const parents = [byId.get(selected.idBo), byId.get(selected.idMe)].filter(Boolean)
  parents.forEach((parent) => {
    add(parent)
    addPartner(parent)
    const grandParents = [byId.get(parent.idBo), byId.get(parent.idMe)].filter(Boolean)
    grandParents.forEach((grandParent) => {
      add(grandParent)
      addPartner(grandParent)
    })

    const parentSiblings = members.filter((candidate) =>
      candidate.id !== parent.id &&
      ((parent.idBo && candidate.idBo === parent.idBo) || (parent.idMe && candidate.idMe === parent.idMe)),
    )
    parentSiblings.forEach((sibling) => {
      add(sibling)
      addPartner(sibling)
      addChildren(sibling)
    })

    const siblings = members.filter((candidate) =>
      candidate.id !== selected.id &&
      ((selected.idBo && candidate.idBo === selected.idBo) || (selected.idMe && candidate.idMe === selected.idMe)),
    )
    siblings.forEach((sibling) => {
      add(sibling)
      addPartner(sibling)
      addChildren(sibling)
    })
  })

  return related
}
